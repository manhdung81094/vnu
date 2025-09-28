import { TriangleDownIcon, XCircleFillIcon } from "@primer/octicons-react";
import { Box, Button, Checkbox, SelectPanel } from "@primer/react";
import { useMemo, useState } from "react";
import Text from "../../../components-ui/text";

import { ISelectboxBasePropsWithValueString } from "../../../model/ui/ISelectboxBaseProps";
import { useChuanDauRa } from "../../../hooks/useChuanDauRa";

interface ISelectboxChuanDauRaProps extends ISelectboxBasePropsWithValueString {
  is_dao_tao: boolean;
}
const getTrailingVisual = (data: any) => {
  return (
    <Text
      text={data.name}
      sx={{
        color: "fg.muted",
        fontSize: "12px",
      }}
    />
  );
};
const SelectboxChuanDauRa = (props: ISelectboxChuanDauRaProps) => {
  const { is_dao_tao } = props;

  const { source } = useChuanDauRa({is_dao_tao});

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const dataSource = useMemo(() => {
    return source.map((x) => ({
      id: x.name,
      text: `${props.preText ?? ""}${x.name}`,
      search: `${x.name}`,
      trailingVisual: getTrailingVisual(x),
    }));
  }, [props.preText, source]);
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
                ? `Tất cả CĐR`
                : selectedData.map((g) => g.text).join(", ")
              : props.placeHolder ?? "Chọn CĐR"}
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

export default SelectboxChuanDauRa;
