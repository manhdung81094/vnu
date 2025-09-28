import { TriangleDownIcon, XCircleFillIcon } from "@primer/octicons-react";
import { Box, Button, SelectPanel } from "@primer/react";
import { useMemo, useState } from "react";
import Text from "../../../components-ui/text";
import { IComboboxBasePropsWithValueString } from "../../../model/ui/IComboboxBaseProps";

interface IComboboxHinhThucDanhGiaProps extends IComboboxBasePropsWithValueString {}
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
const ComboboxHinhThucDanhGia = (props: IComboboxHinhThucDanhGiaProps) => {
  const hinhThucDanhGia = [
    { id: 1, name: "Chuyền cần(PPDG1)" },
    { id: 2, name: "Bài kiểm tra tự luận(PPDG2)" },
    { id: 3, name: "Làm việc nhóm(PPDG8)" },
    { id: 4, name: "Thi trắc nghiệm và tự luận(PPDG6)/Bài tiểu luận(PPDG13)" },
  ];

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const dataSource = useMemo(() => {
    return hinhThucDanhGia.map((x) => ({
      id: x.name,
      text: `${props.preText ?? ""}${x.name}`,
      search: `${x.name}`,
      trailingVisual: getTrailingVisual(x),
    }));
  }, [props.preText, hinhThucDanhGia]);
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

export default ComboboxHinhThucDanhGia;
