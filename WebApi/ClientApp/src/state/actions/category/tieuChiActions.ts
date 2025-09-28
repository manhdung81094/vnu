import { eTieuChiActionsObj } from "../../action-types/category/ITieuChiActions";
import { generateActions } from "../generateActions";

export const tieuChiActions = {
  ...generateActions(eTieuChiActionsObj, "TIEU_CHI"),
};
