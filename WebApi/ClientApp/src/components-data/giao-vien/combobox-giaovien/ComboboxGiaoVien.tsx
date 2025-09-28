import { TriangleDownIcon, XCircleFillIcon } from "@primer/octicons-react";
import { Box, Button, SelectPanel } from "@primer/react";
import { useMemo, useState } from "react";
import Text from "../../../components-ui/text";
import { IComboboxBasePropsWithValueString } from "../../../model/ui/IComboboxBaseProps";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useGiaoVien } from "../../../hooks/useGiaoVien";

interface IComboboxGiaoVienProps extends IComboboxBasePropsWithValueString {}
const getTrailingVisual = (data: any) => {
  return (
    <Text
      text={data.ma_cb}
      sx={{
        color: "fg.muted",
        fontSize: "12px",
      }}
    />
  );
};
const ComboboxGiaoVien = (props: IComboboxGiaoVienProps) => {
  // const { giaoVienList } = useAppSelector((x) => x.deCuong.deCuong);
  const { giaoViens } = useGiaoVien();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const dataSource = useMemo(() => {
    return giaoViens.map((x) => ({
      id: x.id_cb,
      text: `${props.preText ?? ""}${x.ma_cb} - ${x.ho_ten}`,
      search: `${x.ho_ten} ${x.ma_cb}`,
      trailingVisual: getTrailingVisual(x),
    }));
  }, [props.preText, giaoViens, props]);
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
              : props.placeHolder ?? "Chọn giáo viên"}
          </p>
        </Button>
      )}
      title={
        <>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ flex: 1 }}>{props.placeHolder ?? "Chọn giáo viên"}</Box>
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

export default ComboboxGiaoVien;
