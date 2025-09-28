import { IDmMucDo } from "../../../model/respone/category/IDmMucDo";
import { generateActionTypeIds } from "../generateActionTypeIds";
import IGenericActionType from "../IGenericActionType";

export const eMucDoActionsObj = {
  LOAD_START: undefined,
  LOAD_SUCCESS: {} as IDmMucDo[],
  LOAD_ERRR: "",
};
export const eMucDoActionIds = generateActionTypeIds(
  eMucDoActionsObj,
  "MUC_DO"
);
export type IMucDoActionTypes = IGenericActionType<
  typeof eMucDoActionsObj,
  "MUC_DO"
>;
