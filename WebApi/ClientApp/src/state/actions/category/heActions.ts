import { eDmHeActionsObj } from "../../action-types/category/IDmHeActions";
import { generateActions } from "../generateActions";

export const heActions = {
  ...generateActions(eDmHeActionsObj, "HE"),
};
