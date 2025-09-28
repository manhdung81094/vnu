import { IGiaoVien } from "../../../model/respone/category/IGiaoVien";
import { generateActionTypeIds } from "../generateActionTypeIds";
import IGenericActionType from "../IGenericActionType";

export const eGiaovienActionsObj = {
  LOAD_START: undefined,
  LOAD_SUCCESS: {} as IGiaoVien[],
  LOAD_ERRR: "",

  CHANGE_REQUEST: {} as any,
};
export const eGiaovienActionIds = generateActionTypeIds(
  eGiaovienActionsObj,
  "GIAO_VIEN"
);
export type IGiaovienActionTypes = IGenericActionType<
  typeof eGiaovienActionsObj,
  "GIAO_VIEN"
>;
