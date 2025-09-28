import { IBoMon } from "../../../model/respone/category/IBoMon";
import { generateActionTypeIds } from "../generateActionTypeIds";
import IGenericActionType from "../IGenericActionType";

export const eBoMonActionsObj = {
  LOAD_START: undefined,
  LOAD_SUCCESS: {} as IBoMon[],
  LOAD_ERRR: "",
};
export const eBoMonActionIds = generateActionTypeIds(
  eBoMonActionsObj,
  "BO_MON"
);
export type IBoMonActionTypes = IGenericActionType<
  typeof eBoMonActionsObj,
  "BO_MON"
>;
