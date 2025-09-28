import { eGiaovienActionsObj } from "../../action-types/category/IGiaoVienActions";
import { generateActions } from "../generateActions";

export const giaoVienActions = {
  ...generateActions(eGiaovienActionsObj, "GIAO_VIEN"),
};
