import { eBoMonActionsObj } from "../../action-types/category/IBoMonActions";
import { generateActions } from "../generateActions";

export const boMonActions = {
  ...generateActions(eBoMonActionsObj, "BO_MON"),
};
