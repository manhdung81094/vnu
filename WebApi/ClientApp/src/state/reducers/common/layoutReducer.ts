import { eNavSubMode } from "../../../model/common/eNavSubMode";
import { eThemeMode } from "../../../model/common/eThemeMode";
import { ILayouActions } from "../../action-types/common/ILayouActions";
import { ILayoutReducer } from "../../reducer-model/common/ILayoutReducer";
const iniState: ILayoutReducer = {
  themeMode: eThemeMode.light,
  navSubMode: window.innerWidth >= 1400 ? eNavSubMode.FULL : eNavSubMode.POPUP,
  hoc_ky: parseInt(localStorage.getItem("hoc_ky") ?? "0") ?? 0,
  nam_hoc: localStorage.getItem("nam_hoc") ?? "",
  ky_dang_ky: parseInt(localStorage.getItem("ky_dang_ky") ?? "0") ?? 0,
};
export const layoutReducer = (
  state: ILayoutReducer = iniState,
  action: ILayouActions
): ILayoutReducer => {
  switch (action.type) {
    case "LAYOUT_CHANGE_THEME_MODE":
      return {
        ...state,
        themeMode: action.payload,
      };
    case "LAYOUT_CHANGE_NAV_MODE":
      return {
        ...state,
        navSubMode: action.payload,
      };
    case "LAYOUT_CHANGE_MODULE_SELECTED":
      return {
        ...state,
        moduleSelected: action.payload,
      };
    case "LAYOUT_CHANGE_HOC_KY":
      localStorage.setItem("hoc_ky", action.payload.toString());
      return {
        ...state,
        hoc_ky: action.payload,
      };
    case "LAYOUT_CHANGE_NAM_HOC":
      localStorage.setItem("nam_hoc", action.payload.toString());

      return {
        ...state,
        nam_hoc: action.payload,
      };
    case "LAYOUT_CHANGE_KY_DANG_KY":
      localStorage.setItem("ky_dang_ky", action.payload.toString());

      return {
        ...state,
        ky_dang_ky: action.payload,
      };
    default:
      return state;
  }
};
