import { NotifyHelper } from "../../../helpers/toast";
import { eChuongActionsObj } from "../../action-types/de-cuong/IChuongAction";
import { generateActionForKey, generateActions } from "../generateActions";

export const chuongActions = {
  ...generateActions(eChuongActionsObj, "CHUONG"),
  ...generateActionForKey(
    eChuongActionsObj,
    "CHUONG",
    "SAVE_SUCCESS",
    () => {
      NotifyHelper.Success("Đã cập nhật");
    }
  ),
  ...generateActionForKey(
    eChuongActionsObj,
    "CHUONG",
    "SAVE_ERROR",
    (m: string) => {
      NotifyHelper.Error(m);
    }
  ),
  ...generateActionForKey(
    eChuongActionsObj,
    "CHUONG",
    "DELETE_SUCCESS",
    () => {
      NotifyHelper.Success("Đã xóa");
    }
  ),
  ...generateActionForKey(
    eChuongActionsObj,
    "CHUONG",
    "DELETE_ERROR",
    (m: string) => {
      NotifyHelper.Error(m);
    }
  ),
};
