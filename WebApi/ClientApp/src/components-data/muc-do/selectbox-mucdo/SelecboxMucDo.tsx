import { TriangleDownIcon, XCircleFillIcon } from "@primer/octicons-react";
import { Box, Button, Checkbox, SelectPanel } from "@primer/react";
import { useMemo, useState } from "react";
import Text from "../../../components-ui/text";
import { useMucDo } from "../../../hooks/useMucDo";
import { ISelectboxBaseProps } from "../../../model/ui/ISelectboxBaseProps";

interface ISelecboxMucDoProps extends ISelectboxBaseProps {}

const SelecboxMucDo = (props: ISelecboxMucDoProps) => {
  const { mucDos } = useMucDo();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const dataSource = useMemo(() => {
    return mucDos.map((x) => ({
      id: x.id,
      text: `${props.preText ?? ""}${x.ten_muc_do}`,
      search: `${x.ten_muc_do}`,
    }));
  }, [props.preText, mucDos]);
  const filterdData = useMemo(() => {
    return dataSource.filter((item) =>
      item.search.toLowerCase().includes(filter.toLowerCase())
    );
  }, [dataSource, filter]);
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
          sx={{
            ...props.sx,
          }}
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
                ? `Tất cả mức độ`
                : selectedData.map((g) => g.text).join(", ")
              : props.placeHolder ?? "Chọn mức độ`"}
          </p>
        </Button>
      )}
      title={
        <>
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
                  sx={{
                    color: "danger.emphasis",
                    mr: -2,
                  }}
                  onClick={() => {
                    props.onValueChanged([]);
                  }}
                >
                  Bỏ chọn
                </Button>
              )}
          </Box>
        </>
      }
      placeholderText="Nhập từ khóa tìm kiếm"
      open={open}
      onOpenChange={setOpen}
      items={filterdData}
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

export default SelecboxMucDo;
