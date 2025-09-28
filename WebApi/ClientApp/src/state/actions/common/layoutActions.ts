import { eLayoutActionDefine } from "../../action-types/common/ILayouActions";
import { generateActions } from "../generateActions";

export const layoutActions = {
  ...generateActions(eLayoutActionDefine, "LAYOUT"),
};
