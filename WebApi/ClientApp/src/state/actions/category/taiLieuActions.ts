import { eTaiLieuActionsObj } from "../../action-types/category/ITaiLieuActions";
import { generateActions } from "../generateActions";

export const taiLieuActions = {
  ...generateActions(eTaiLieuActionsObj, "TAI_LIEU"),
};
