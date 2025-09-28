import { IDmTieuChi } from "../../../model/respone/category/IDmTieuChi";
import { generateActionTypeIds } from "../generateActionTypeIds";
import IGenericActionType from "../IGenericActionType";

export const eTieuChiActionsObj = {
  LOAD_START: undefined,
  LOAD_SUCCESS: {} as IDmTieuChi[],
  LOAD_ERRR: "",
};
export const eTieuChiActionIds = generateActionTypeIds(
  eTieuChiActionsObj,
  "TIEU_CHI"
);
export type ITieuChiActionTypes = IGenericActionType<
  typeof eTieuChiActionsObj,
  "TIEU_CHI"
>;
