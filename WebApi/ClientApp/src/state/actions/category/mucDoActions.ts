import { eMucDoActionsObj } from "../../action-types/category/IMucDoActions";
import { generateActions } from "../generateActions";

export const mucDoActions = {
  ...generateActions(eMucDoActionsObj, "MUC_DO"),
};
