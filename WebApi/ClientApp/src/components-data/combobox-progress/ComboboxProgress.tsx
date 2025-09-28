import { ChevronDownIcon } from "@primer/octicons-react";
import { ActionList, ActionMenu } from "@primer/react";
import { useMemo } from "react";
import { IComboboxBaseProps } from "../../model/ui/IComboboxBaseProps";
import { eProgress, eProgressDic } from "../../model/common/eProgress";

interface IComboboxProgressProps extends IComboboxBaseProps {}

const ComboboxProgress = (props: IComboboxProgressProps) => {
  console.log("ComboboxProgress props", props);
  const dataSource = useMemo(() => {
    return [
      {
        id: eProgress.khoi_tao,
        text: `${props.preText ?? ""}${eProgressDic[eProgress.khoi_tao]}`,
      },
      {
        id: eProgress.duyet,
        text: `${props.preText ?? ""}${eProgressDic[eProgress.duyet]}`,
      },
      {
        id: eProgress.tu_choi,
        text: `${props.preText ?? ""}${eProgressDic[eProgress.tu_choi]}`,
      },
    ];
  }, [props.preText]);
  const selectedData = useMemo(() => {
    return dataSource.find((x) => x.id === props.value);
  }, [dataSource, props.value]);

  console.log("selectedData", selectedData);
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
          : props.placeHolder ?? "Chọn trạng thái"}
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

export default ComboboxProgress;
