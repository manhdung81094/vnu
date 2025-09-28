import { IKhoa } from "../../../model/respone/category/IKhoa";
import { generateActionTypeIds } from "../generateActionTypeIds";
import IGenericActionType from "../IGenericActionType";

export const eKhoaActionsObj = {
  LOAD_START: undefined,
  LOAD_SUCCESS: {} as IKhoa[],
  LOAD_ERRR: "",
};
export const eKhoaActionIds = generateActionTypeIds(eKhoaActionsObj, "KHOA");
export type IKhoaActionTypes = IGenericActionType<
  typeof eKhoaActionsObj,
  "KHOA"
>;
