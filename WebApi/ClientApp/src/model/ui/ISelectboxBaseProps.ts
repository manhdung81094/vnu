import { VariantType } from "@primer/react/lib/Button/types";
import { BetterSystemStyleObject } from "@primer/react/lib/sx";

export interface ISelectboxBaseProps {
  isReadonly?: boolean;
  value?: number[];
  onValueChanged: (id: number[], data?: any) => void;
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

interface ISelectboxBaseSharedProps {
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

export interface ISelectboxBaseProps extends ISelectboxBaseSharedProps {
  value?: number[];
  onValueChanged: (id: number[], data?: any) => void;
}

// Selectbox with string[] value
export interface ISelectboxBasePropsWithValueString
  extends ISelectboxBaseSharedProps {
  value?: string[];
  onValueChanged: (id: string[], data?: any) => void;
}
