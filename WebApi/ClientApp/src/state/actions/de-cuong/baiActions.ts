import { NotifyHelper } from "../../../helpers/toast";
import { eBaiActionsObj } from "../../action-types/de-cuong/IBaiAction";
import { generateActionForKey, generateActions } from "../generateActions";

export const baiActions = {
  ...generateActions(eBaiActionsObj, "BAI"),
  ...generateActionForKey(
    eBaiActionsObj,
    "BAI",
    "SAVE_SUCCESS",
    () => {
      NotifyHelper.Success("Đã cập nhật");
    }
  ),
  ...generateActionForKey(
    eBaiActionsObj,
    "BAI",
    "SAVE_ERROR",
    (m: string) => {
      NotifyHelper.Error(m);
    }
  ),
  ...generateActionForKey(
    eBaiActionsObj,
    "BAI",
    "DELETE_SUCCESS",
    () => {
      NotifyHelper.Success("Đã xóa");
    }
  ),
  ...generateActionForKey(
    eBaiActionsObj,
    "BAI",
    "DELETE_ERROR",
    (m: string) => {
      NotifyHelper.Error(m);
    }
  ),
};
