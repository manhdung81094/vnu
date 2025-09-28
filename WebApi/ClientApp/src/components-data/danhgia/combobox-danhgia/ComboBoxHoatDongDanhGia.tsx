import { TriangleDownIcon, XCircleFillIcon } from "@primer/octicons-react";
import { Box, Button, SelectPanel } from "@primer/react";
import { useMemo, useState } from "react";
import Text from "../../../components-ui/text";
import { IComboboxBasePropsWithValueString } from "../../../model/ui/IComboboxBaseProps";

interface IComboboxHoatDongDanhGiaProps extends IComboboxBasePropsWithValueString {}
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
const ComboboxHoatDongDanhGia = (props: IComboboxHoatDongDanhGiaProps) => {
  const hoatDongDanhGia = [
    { id: 1, name: "Thường xuyên" },
    { id: 2, name: "Kiểm tra giữa kì lần 1" },
    { id: 3, name: "Kiểm tra giữa kì lần 2" },
    { id: 4, name: "Thi cuối kì" },
  ];

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const dataSource = useMemo(() => {
    return hoatDongDanhGia.map((x) => ({
      id: x.name,
      text: `${props.preText ?? ""}${x.name}`,
      search: `${x.name}`,
      trailingVisual: getTrailingVisual(x),
    }));
  }, [props.preText, hoatDongDanhGia]);
  const filterdData = useMemo(() => {
    return dataSource.filter((item) =>
      item.search.toLowerCase().includes(filter.toLowerCase())
    );
  }, [dataSource, filter]);
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
              : props.placeHolder ?? "Chọn hình thức đánh giá"}
          </p>
        </Button>
      )}
      title={
        <>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ flex: 1 }}>
              {props.placeHolder ?? "Chọn hình thức đánh giá"}
            </Box>
            {(props.isShowClearButton === undefined ||
              props.isShowClearButton === true) &&
              (props.value ?? "") && (
                <Button
                  trailingVisual={XCircleFillIcon}
                  variant="invisible"
                  sx={{
                    color: "danger.emphasis",
                    mr: -2,
                  }}
                  onClick={() => {
                    props.onValueChanged("");
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
        if (!data) props.onValueChanged("");
        else props.onValueChanged(data.id);
      }}
      onFilterChange={setFilter}
      showItemDividers={true}
      overlayProps={{ width: "large", height: "medium" }}
    />
  );
};

export default ComboboxHoatDongDanhGia;
