import { ICDR_Chuong } from "../../../model/respone/decuong/ICDR_Chuong";
import { generateActionTypeIds } from "../generateActionTypeIds";
import IGenericActionType from "../IGenericActionType";

export const eChuongActionsObj = {
  LOAD_START: 0,
  LOAD_SUCCESS: {} as ICDR_Chuong[],
  LOAD_ERROR: "",

  LOAD_BY_ID_START: 0,
  LOAD_BY_ID_SUCCESS: {} as ICDR_Chuong,
  LOAD_BY_ID_ERROR: "",

  SAVE_START: {} as ICDR_Chuong,
  SAVE_SUCCESS: {} as ICDR_Chuong,
  SAVE_ERROR: "",

  DELETE_START: 0,
  DELETE_SUCCESS: undefined,
  DELETE_ERROR: "",

  SHOW_EDIT_MODAL: {} as undefined | ICDR_Chuong,
  CLOSE_EDIT_MODAL: undefined,

};
export const eChuongActionIds = generateActionTypeIds(
  eChuongActionsObj,
  "CHUONG"
);
export type IChuongActionTypes = IGenericActionType<
  typeof eChuongActionsObj,
  "CHUONG"
>;
