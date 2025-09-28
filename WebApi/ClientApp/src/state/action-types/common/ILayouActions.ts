import { eNavSubMode } from "../../../model/common/eNavSubMode";
import { eThemeMode } from "../../../model/common/eThemeMode";
import { IMenuViewModel } from "../../../model/respone/auth/IMenuViewModel";
import { generateActionTypeIds } from "../generateActionTypeIds";
import IGenericActionType from "../IGenericActionType";

export const eLayoutActionDefine = {
  CHANGE_THEME_MODE: {} as eThemeMode,
  CHANGE_NAV_MODE: {} as eNavSubMode,
  CHANGE_MODULE_SELECTED: {} as IMenuViewModel | undefined,

  CHANGE_HOC_KY: 0,
  CHANGE_NAM_HOC: "",
  CHANGE_KY_DANG_KY: 0,
};
export const eThemeModeActionTypeIds = generateActionTypeIds(
  eLayoutActionDefine,
  "LAYOUT"
);

export type ILayouActions = IGenericActionType<
  typeof eLayoutActionDefine,
  "LAYOUT"
>;
