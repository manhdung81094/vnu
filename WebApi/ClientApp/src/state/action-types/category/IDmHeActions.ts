import { IDmHe } from "../../../model/respone/category/IDmHe";
import { generateActionTypeIds } from "../generateActionTypeIds";
import IGenericActionType from "../IGenericActionType";

export const eDmHeActionsObj = {
  LOAD_START: undefined,
  LOAD_SUCCESS: {} as IDmHe[],
  LOAD_ERRR: "",
};
export const eDmHeActionIds = generateActionTypeIds(
  eDmHeActionsObj,
  "HE"
);
export type IDmHeActionTypes = IGenericActionType<
  typeof eDmHeActionsObj,
  "HE"
>;
