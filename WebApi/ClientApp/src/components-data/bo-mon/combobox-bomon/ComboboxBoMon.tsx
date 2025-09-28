import { TriangleDownIcon, XCircleFillIcon } from "@primer/octicons-react";
import { Box, Button, SelectPanel } from "@primer/react";
import { useMemo, useState } from "react";
import { IComboboxBaseProps } from "../../../model/ui/IComboboxBaseProps";
import { IBoMon } from "../../../model/respone/category/IBoMon";
import Text from "../../../components-ui/text";
import { useBoMon } from "../../../hooks/useBoMon";

interface IComboboxBoMonProps extends IComboboxBaseProps {
  id_hes?: number[];
}
const getTrailingVisual = (BoMon: IBoMon) => {
  return (
    <Text
      text={BoMon.ma_bo_mon}
      sx={{
        color: "fg.muted",
        fontSize: "12px",
      }}
    />
  );
};
const ComboboxBoMon = (props: IComboboxBoMonProps) => {
  const { boMons } = useBoMon();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const dataSource = useMemo(() => {
    return boMons.map((x) => ({
      id: x.id_bm,
      text: `${props.preText ?? ""}${x.bo_mon}`,
      search: `${x.bo_mon} ${x.ma_bo_mon}`,
      trailingVisual: getTrailingVisual(x),
    }));
  }, [props.preText, boMons, props]);
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
              : props.placeHolder ?? "Chọn bộ môn"}
          </p>
        </Button>
      )}
      title={
        <>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ flex: 1 }}>{props.placeHolder ?? "Chọn bộ môn"}</Box>
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

export default ComboboxBoMon;
