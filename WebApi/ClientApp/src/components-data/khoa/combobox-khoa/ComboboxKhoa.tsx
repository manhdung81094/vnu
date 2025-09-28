import { TriangleDownIcon, XCircleFillIcon } from "@primer/octicons-react";
import { Box, Button, SelectPanel } from "@primer/react";
import { useMemo, useState } from "react";
import { IComboboxBaseProps } from "../../../model/ui/IComboboxBaseProps";
import { IKhoa } from "../../../model/respone/category/IKhoa";
import Text from "../../../components-ui/text";
import { useKhoa } from "../../../hooks/useKhoa";

interface IComboboxKhoaProps extends IComboboxBaseProps {
  id_hes?: number[];
}
const getTrailingVisual = (khoa: IKhoa) => {
  return (
    <Text
      text={khoa.ma_khoa}
      sx={{
        color: "fg.muted",
        fontSize: "12px",
      }}
    />
  );
};
const ComboboxKhoa = (props: IComboboxKhoaProps) => {
  const { khoas } = useKhoa();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const dataSource = useMemo(() => {
    return khoas.map((x) => ({
      id: x.id_khoa,
      text: `${props.preText ?? ""}${x.ten_khoa}`,
      search: `${x.ten_khoa} ${x.ma_khoa}`,
      trailingVisual: getTrailingVisual(x),
    }));
  }, [props.preText, khoas, props]);
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
          size="small"
          {...anchorProps}
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
              : props.placeHolder ?? "Chọn khoa"}
          </p>
        </Button>
      )}
      title={
        <>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ flex: 1 }}>{props.placeHolder ?? "Chọn khoa"}</Box>
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
                  onClick={() => {
                    props.onValueChanged(0);
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
        if (!data) props.onValueChanged(0);
        else props.onValueChanged(data.id);
      }}
      onFilterChange={setFilter}
      showItemDividers={true}
      overlayProps={{ width: "large", height: "medium" }}
    />
  );
};

export default ComboboxKhoa;
