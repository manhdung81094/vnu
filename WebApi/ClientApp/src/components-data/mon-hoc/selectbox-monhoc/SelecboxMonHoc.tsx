import { TriangleDownIcon, XCircleFillIcon } from "@primer/octicons-react";
import { Box, Button, Checkbox, SelectPanel } from "@primer/react";
import { useMemo, useState, useEffect } from "react";
import Text from "../../../components-ui/text";
import { useMonHoc } from "../../../hooks/useMonHoc";
import { IMonHoc } from "../../../model/respone/category/IMonHoc";
import { ISelectboxBaseProps } from "../../../model/ui/ISelectboxBaseProps";

interface ISelecboxMonHocProps extends ISelectboxBaseProps {}

const MAX_ITEMS = 100;

const getTrailingVisual = (MonHoc: IMonHoc) => {
  return (
    <Text
      text={MonHoc.ky_hieu}
      sx={{
        color: "fg.muted",
        fontSize: "12px",
      }}
    />
  );
};

// Hook debounce đơn giản
function useDebouncedValue<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

const SelecboxMonHoc = (props: ISelecboxMonHocProps) => {
  const { monhocs } = useMonHoc();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const debouncedFilter = useDebouncedValue(filter, 300);

  const dataSource = useMemo(() => {
    return monhocs.map((x) => ({
      id: x.id_mon,
      text: `${props.preText ?? ""}${x.ky_hieu} - ${x.ten_mon}`,
      search: `${x.ten_mon} ${x.ky_hieu}`,
      trailingVisual: getTrailingVisual(x),
    }));
  }, [props.preText, monhocs]);

  const filteredData = useMemo(() => {
    if (!debouncedFilter.trim()) {
      // Chưa nhập từ khóa, giới hạn số lượng item hiển thị
      return dataSource.slice(0, MAX_ITEMS);
    }
    // Lọc theo từ khóa tìm kiếm
    return dataSource.filter((item) =>
      item.search.toLowerCase().includes(debouncedFilter.toLowerCase())
    );
  }, [dataSource, debouncedFilter]);

  const selectedData = useMemo(() => {
    return dataSource.filter((item) => props.value?.includes(item.id));
  }, [props.value, dataSource]);

  const handleCheckAll = (e: any) => {
    if (e.target.checked) {
      props.onValueChanged(dataSource.map((g) => g.id));
    } else {
      props.onValueChanged([]);
    }
  };

  return (
    <SelectPanel
      renderAnchor={({
        children,
        "aria-labelledby": ariaLabelledBy,
        ...anchorProps
      }) => (
        <Button
          variant={props.variant}
          block={props.block}
          trailingAction={TriangleDownIcon}
          aria-labelledby={` ${ariaLabelledBy}`}
          {...anchorProps}
          sx={{ ...props.sx }}
          size="medium"
        >
          <p
            style={{
              maxWidth: props.maxWidth,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {selectedData?.length
              ? selectedData.length === dataSource.length
                ? `Tất cả môn học`
                : selectedData.map((g) => g.text).join(", ")
              : props.placeHolder ?? "Chọn môn học"}
          </p>
        </Button>
      )}
      title={
        <Box sx={{ display: "flex", alignItems: "center", margin: -1 }}>
          <Box sx={{ flex: "1" }}>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                fontSize: 12,
                margin: 2,
                marginLeft: 1,
              }}
            >
              <Checkbox
                onChange={handleCheckAll}
                checked={selectedData.length === dataSource.length}
                title="Chọn tất cả"
              />
              <Text
                text={props.placeHolder ?? "Chọn tất cả"}
                sx={{ whiteSpace: "nowrap" }}
              />
            </Box>
          </Box>
          {(props.isShowClearButton === undefined ||
            props.isShowClearButton === true) &&
            (props.value?.length ?? 0) > 0 && (
              <Button
                trailingVisual={XCircleFillIcon}
                variant="invisible"
                sx={{ color: "danger.emphasis", mr: -2 }}
                onClick={() => {
                  props.onValueChanged([]);
                }}
              >
                Bỏ chọn
              </Button>
            )}
        </Box>
      }
      placeholderText="Nhập từ khóa tìm kiếm"
      open={open}
      onOpenChange={setOpen}
      items={filteredData}
      selected={selectedData}
      onSelectedChange={(data: any) => {
        props.onValueChanged(data.map((g: any) => g.id));
      }}
      onFilterChange={setFilter}
      showItemDividers={true}
      overlayProps={{ width: "large", height: "medium" }}
    />
  );
};

export default SelecboxMonHoc;
