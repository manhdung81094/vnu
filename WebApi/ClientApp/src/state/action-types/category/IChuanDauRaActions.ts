import { IDmChuanDauRa } from "../../../model/respone/category/IDmChuanDauRa";
import { generateActionTypeIds } from "../generateActionTypeIds";
import IGenericActionType from "../IGenericActionType";

export const eChuanDauRaActionsObj = {
  LOAD_START: undefined,
  LOAD_SUCCESS: {} as IDmChuanDauRa[],
  LOAD_ERRR: "",

  SAVE_START: {} as IDmChuanDauRa,
  SAVE_SUCCESS: {} as IDmChuanDauRa,
  SAVE_ERROR: "",

  DELETE_START: 0,
  DELETE_SUCCESS: undefined,
  DELETE_ERROR: "",

  SHOW_EDIT_MODAL: {} as undefined | IDmChuanDauRa,
  CLOSE_EDIT_MODAL: undefined,

  CHANGE_REQUEST: {} as any,
};
export const eChuanDauRaActionIds = generateActionTypeIds(
  eChuanDauRaActionsObj,
  "CHUAN_DAU_RA"
);
export type IChuanDauRaActionTypes = IGenericActionType<
  typeof eChuanDauRaActionsObj,
  "CHUAN_DAU_RA"
>;
