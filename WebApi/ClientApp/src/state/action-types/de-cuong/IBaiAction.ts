import { ICDR_Bai } from "../../../model/respone/decuong/ICDR_Bai";
import { generateActionTypeIds } from "../generateActionTypeIds";
import IGenericActionType from "../IGenericActionType";

export const eBaiActionsObj = {
  LOAD_START: undefined,
  LOAD_SUCCESS: {} as ICDR_Bai[],
  LOAD_ERROR: "",

  SAVE_START: {} as ICDR_Bai,
  SAVE_SUCCESS: {} as ICDR_Bai,
  SAVE_ERROR: "",

  DELETE_START: 0,
  DELETE_SUCCESS: undefined,
  DELETE_ERROR: "",

};
export const eBaiActionIds = generateActionTypeIds(
  eBaiActionsObj,
  "BAI"
);
export type IBaiActionTypes = IGenericActionType<
  typeof eBaiActionsObj,
  "BAI"
>;
