import { TriangleDownIcon, XCircleFillIcon } from "@primer/octicons-react";
import { Box, Button, SelectPanel } from "@primer/react";
import { useMemo, useState, useEffect } from "react";
import { IComboboxBaseProps } from "../../../model/ui/IComboboxBaseProps";
import { IMonHoc } from "../../../model/respone/category/IMonHoc";
import Text from "../../../components-ui/text";
import { useMonHoc } from "../../../hooks/useMonHoc";
import { useAppSelector } from "../../../hooks/useAppSelector";

interface IComboboxMonHocProps extends IComboboxBaseProps { }

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

// Debounce hook đơn giản
function useDebouncedValue<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

const ComboboxMonHoc = (props: IComboboxMonHocProps) => {
  const { monhocs } = useMonHoc();
  const { user } = useAppSelector((x) => x.auth);
  const { giaoViens } = useAppSelector((x) => x.category.giaoVien);

  let filteredMonhocs = monhocs;
  if (user?.role === "GIANGVIEN") {
    const gv = giaoViens.find((x) => x.id_cb === user.id);
    if (gv) {
      filteredMonhocs = monhocs.filter((x) => x.id_bm === gv.id_bm);
    }
  }

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const debouncedFilter = useDebouncedValue(filter, 300); // debounce 300ms
  const dataSource = useMemo(() => {
    return filteredMonhocs.map((x) => ({
      id: x.id_mon,
      text: `${props.preText ?? ""}${x.ky_hieu} - ${x.ten_mon}`,
      search: `${x.ten_mon} ${x.ky_hieu}`,
      trailingVisual: getTrailingVisual(x),
    }));
  }, [props.preText, filteredMonhocs]);

  const filterdData = useMemo(() => {
    if (!debouncedFilter.trim()) {
      return dataSource.slice(0, MAX_ITEMS); // giới hạn item khi chưa nhập filter
    }
    return dataSource.filter((item) =>
      item.search.toLowerCase().includes(debouncedFilter.toLowerCase())
    );
  }, [dataSource, debouncedFilter]);

  const selectedData = useMemo(() => {
    return dataSource.find((item) => item.id === props.value);
  }, [props.value, dataSource]);
  return (
    <SelectPanel
      renderAnchor={({
        children,
        "aria-labelledby": ariaLabelledBy,
        ...anchorProps
      }) => (
        <Button
          variant={props.variant}
          trailingAction={TriangleDownIcon}
          aria-labelledby={` ${ariaLabelledBy}`}
          {...anchorProps}
          block={props.block}
          size="medium"
        >
          <p
            style={{
              maxWidth: props.maxWidth,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {selectedData
              ? selectedData.text
              : props.placeHolder ?? "Chọn học phần"}
          </p>
        </Button>
      )}
      title={
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ flex: 1 }}>{props.placeHolder ?? "Chọn học phần"}</Box>
          {(props.isShowClearButton === undefined ||
            props.isShowClearButton === true) &&
            (props.value ?? 0) > 0 && (
              <Button
                trailingVisual={XCircleFillIcon}
                variant="invisible"
                sx={{
                  color: "danger.emphasis",
                  mr: -2,
                }}
                onClick={() => props.onValueChanged(0)}
              >
                Bỏ chọn
              </Button>
            )}
        </Box>
      }
      placeholderText="Nhập từ khóa tìm kiếm"
      open={props.isReadonly ? false : open}
      onOpenChange={setOpen}
      items={filterdData}
      selected={selectedData}
      onSelectedChange={(data: any) => {
        if (!data) props.onValueChanged(0);
        else props.onValueChanged(data.id);
      }}
      onFilterChange={setFilter}
      showItemDividers={true}
      overlayProps={{ width: "large", height: "medium" }}
    />
  );
};

export default ComboboxMonHoc;
