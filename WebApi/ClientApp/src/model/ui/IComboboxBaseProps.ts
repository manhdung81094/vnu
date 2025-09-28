import { VariantType } from "@primer/react/lib/Button/types";
import { BetterSystemStyleObject } from "@primer/react/lib/sx";

interface IComboboxBaseSharedProps {
  isReadonly?: boolean;
  isShowClearButton?: boolean;
  preText?: string;
  placeHolder?: string;
  trailingAction?: React.ElementType;
  variant?: VariantType;
  sx?: BetterSystemStyleObject;
  maxWidth?: any;
  multiple?: boolean;
  block?: boolean;
}

export interface IComboboxBaseProps extends IComboboxBaseSharedProps {
  value?: number;
  onValueChanged: (id: number, data?: any) => void;
}

export interface IComboboxBasePropsWithValueString
  extends IComboboxBaseSharedProps {
  value?: string;
  onValueChanged: (id: string, data?: any) => void;
}
