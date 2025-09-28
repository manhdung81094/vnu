import { IDmTaiLieu } from "../../../model/respone/category/IDmTaiLieu";
import { generateActionTypeIds } from "../generateActionTypeIds";
import IGenericActionType from "../IGenericActionType";

export const eTaiLieuActionsObj = {
  LOAD_START: undefined,
  LOAD_SUCCESS: {} as IDmTaiLieu[],
  LOAD_ERRR: "",
};
export const eTaiLieuActionIds = generateActionTypeIds(
  eTaiLieuActionsObj,
  "TAI_LIEU"
);
export type ITaiLieuActionTypes = IGenericActionType<
  typeof eTaiLieuActionsObj,
  "TAI_LIEU"
>;
