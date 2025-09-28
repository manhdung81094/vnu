import { ChevronDownIcon } from "@primer/octicons-react";
import { ActionList, ActionMenu } from "@primer/react";
import { useMemo } from "react";
import { IComboboxBaseProps } from "../../../model/ui/IComboboxBaseProps";
import { useAppSelector } from "../../../hooks/useAppSelector";


interface IComboboxLoaiCDRProps extends IComboboxBaseProps {}

const ComboboxLoaiCDR = (props: IComboboxLoaiCDRProps) => {
  const dataSource = useMemo(() => {
    return [
      {
        id: 0,
        text: `${props.preText ?? ""}${"Học phần"}`,
      },
      {
        id: 1,
        text: `${props.preText ?? ""}${"Chương trình đào tạo"}`,
      },
    ];
  }, [props.preText]);
  const selectedData = useMemo(() => {
    return dataSource.find((x) => x.id === props.value);
  }, [dataSource, props.value]);

  return (
    <ActionMenu>
      <ActionMenu.Button
        aria-label=""
        trailingAction={props.trailingAction ?? ChevronDownIcon}
        variant={props.variant}
        sx={props.sx}
        size="medium"
      >
        {selectedData
          ? selectedData.text
          : props.placeHolder ?? "Chọn loại chuẩn đầu ra"}
      </ActionMenu.Button>
      <ActionMenu.Overlay width="auto">
        <ActionList selectionVariant="single">
          {dataSource.map((item, index) => {
            return (
              <ActionList.Item
                key={item.text}
                selected={props.value !== undefined && item.id === props.value}
                onSelect={() => {
                  props.onValueChanged(item.id, item);
                }}
              >
                {item.text}
              </ActionList.Item>
            );
          })}
        </ActionList>
      </ActionMenu.Overlay>
    </ActionMenu>
  );
};

export default ComboboxLoaiCDR;
