import { eMonHocActionsObj } from "../../action-types/category/IMonHocActions";
import { generateActions } from "../generateActions";

export const monHocActions = {
  ...generateActions(eMonHocActionsObj, "MON_HOC"),
};
