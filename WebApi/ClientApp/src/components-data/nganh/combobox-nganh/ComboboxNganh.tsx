import { TriangleDownIcon, XCircleFillIcon } from "@primer/octicons-react";
import { Box, Button, SelectPanel } from "@primer/react";
import { useMemo, useState } from "react";
import Text from "../../../components-ui/text";
import { IComboboxBaseProps } from "../../../model/ui/IComboboxBaseProps";
import { IDmNganh } from "../../../model/respone/category/IDmNganh";
import { useNganh } from "../../../hooks/useNganh";

interface IComboboxNganhProps extends IComboboxBaseProps {}
const getTrailingVisual = (nganh: IDmNganh) => {
  return (
    <Text
      text={nganh.ma_nganh}
      sx={{
        color: "fg.muted",
        fontSize: "12px",
      }}
    />
  );
};

const ComboboxNganh = (props: IComboboxNganhProps) => {
  const { nganhs } = useNganh();

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const dataSource = useMemo(() => {
    return nganhs.map((x) => ({
      id: x.id_nganh,
      text: `${props.preText ?? ""}${x.ten_nganh}`,
      search: `${x.ten_nganh} ${x.ma_nganh}`,
      trailingVisual: getTrailingVisual(x),
    }));
  }, [nganhs, props.preText]);
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
          sx={{
            maxWidth: 300,
          }}
          trailingAction={TriangleDownIcon}
          aria-labelledby={` ${ariaLabelledBy}`}
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
              : props.placeHolder ?? "Chọn ngành"}
          </p>
        </Button>
      )}
      title={
        <>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ flex: 1 }}>{props.placeHolder ?? "Chọn ngành"}</Box>
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
      placeholderText="Tìm kiếm"
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

export default ComboboxNganh;
