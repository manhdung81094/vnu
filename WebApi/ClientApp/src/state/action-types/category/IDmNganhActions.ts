import { IDmNganh } from "../../../model/respone/category/IDmNganh";
import { generateActionTypeIds } from "../generateActionTypeIds";
import IGenericActionType from "../IGenericActionType";

export const eDmNganhActionsObj = {
  LOAD_START: undefined,
  LOAD_SUCCESS: {} as IDmNganh[],
  LOAD_ERRR: "",
};
export const eDmNganhActionIds = generateActionTypeIds(
  eDmNganhActionsObj,
  "NGANH"
);
export type IDmNganhActionTypes = IGenericActionType<
  typeof eDmNganhActionsObj,
  "NGANH"
>;
