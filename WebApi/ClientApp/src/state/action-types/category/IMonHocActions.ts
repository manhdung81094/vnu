import { IMonHoc } from "../../../model/respone/category/IMonHoc";
import { generateActionTypeIds } from "../generateActionTypeIds";
import IGenericActionType from "../IGenericActionType";

export const eMonHocActionsObj = {
  LOAD_START: undefined,
  LOAD_SUCCESS: {} as IMonHoc[],
  LOAD_ERRR: "",

  CHANGE_REQUEST: {} as any,
};
export const eMonHocActionIds = generateActionTypeIds(
  eMonHocActionsObj,
  "MON_HOC"
);
export type IMonHocActionTypes = IGenericActionType<
  typeof eMonHocActionsObj,
  "MON_HOC"
>;
