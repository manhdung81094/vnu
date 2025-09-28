import { TriangleDownIcon, XCircleFillIcon } from "@primer/octicons-react";
import { Box, Button, SelectPanel } from "@primer/react";
import { useMemo, useState } from "react";
import Text from "../../../components-ui/text";
import { IComboboxBaseProps } from "../../../model/ui/IComboboxBaseProps";

interface IComboboxLoaiHocPhanProps extends IComboboxBaseProps {}
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

const ComboboxLoaiHocPhan = (props: IComboboxLoaiHocPhanProps) => {
  const loaiHocphan = [
    {
      id: 0,
      name: "Tự chọn",
    },
    {
      id: 1,
      name: "Bắt buộc",
    },
  ];

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const dataSource = useMemo(() => {
    return loaiHocphan.map((x) => ({
      id: x.id,
      text: `${props.preText ?? ""}${x.name}`,
      search: `${x.name}`,
      trailingVisual: getTrailingVisual(x),
    }));
  }, [loaiHocphan, props.preText]);
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
              : props.placeHolder ?? "Chọn loại học phần"}
          </p>
        </Button>
      )}
      title={
        <>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ flex: 1 }}>{props.placeHolder ?? "Chọn loại học phần"}</Box>
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

export default ComboboxLoaiHocPhan;
