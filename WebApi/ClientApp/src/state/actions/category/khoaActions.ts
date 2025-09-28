import { eKhoaActionsObj } from "../../action-types/category/IKhoaActions";
import { generateActions } from "../generateActions";

export const khoaActions = {
  ...generateActions(eKhoaActionsObj, "KHOA"),
};
