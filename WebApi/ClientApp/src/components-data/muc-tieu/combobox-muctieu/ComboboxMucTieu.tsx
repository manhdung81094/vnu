import { TriangleDownIcon, XCircleFillIcon } from "@primer/octicons-react";
import { Box, Button, SelectPanel } from "@primer/react";
import { useMemo, useState } from "react";
import Text from "../../../components-ui/text";
import { IComboboxBasePropsWithValueString } from "../../../model/ui/IComboboxBaseProps";

interface IComboboxMucTieuProps extends IComboboxBasePropsWithValueString {
  mucTieus: any[];
}

const getTrailingVisual = (data: any) => (
  <Text
    text={data.name}
    sx={{
      color: "fg.muted",
      fontSize: "12px",
    }}
  />
);

const ComboboxMucTieu = ({
  mucTieus,
  value,
  onValueChanged,
  preText,
  placeHolder = "Chọn mục tiêu",
  variant,
  maxWidth,
  isShowClearButton = true,
}: IComboboxMucTieuProps) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const dataSource = useMemo(
    () =>
      mucTieus.map((x) => ({
        id: x.ma, // ✅ Dùng ma làm ID nếu value là ma
        text: `${preText ?? ""}${x.ma}`,
        search: `${x.ma}`,
        trailingVisual: getTrailingVisual(x),
      })),
    [preText, mucTieus]
  );

  const filteredData = useMemo(
    () =>
      dataSource.filter((item) =>
        item.search.toLowerCase().includes(filter.toLowerCase())
      ),
    [dataSource, filter]
  );

  const selectedData = useMemo(
    () => dataSource.find((item) => item.id === value),
    [value, dataSource]
  );

  return (
    <SelectPanel
      renderAnchor={({ "aria-labelledby": ariaLabelledBy, ...anchorProps }) => (
        <Button
          variant={variant}
          trailingAction={TriangleDownIcon}
          aria-labelledby={ariaLabelledBy}
          {...anchorProps}
          size="medium"
        >
          <p
            style={{
              maxWidth: maxWidth,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {selectedData ? selectedData.text : placeHolder}
          </p>
        </Button>
      )}
      title={
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ flex: 1 }}>{placeHolder}</Box>
          {isShowClearButton && value && (
            <Button
              trailingVisual={XCircleFillIcon}
              variant="invisible"
              sx={{ color: "danger.emphasis", mr: -2 }}
              onClick={() => onValueChanged("")}
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
      onSelectedChange={(data: any) =>
        onValueChanged(data ? data.id : "")
      }
      onFilterChange={setFilter}
      showItemDividers
      overlayProps={{ width: "large", height: "medium" }}
    />
  );
};

export default ComboboxMucTieu;
