import { eDmNganhActionsObj } from "../../action-types/category/IDmNganhActions";
import { generateActions } from "../generateActions";

export const nganhActions = {
  ...generateActions(eDmNganhActionsObj, "NGANH"),
};
