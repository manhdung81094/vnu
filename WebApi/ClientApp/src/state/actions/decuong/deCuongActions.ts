import { NotifyHelper } from "../../../helpers/toast";
import { eDeCuongActionsObj } from "../../action-types/decuong/IDeCuongActions";
import { generateActionForKey, generateActions } from "../generateActions";

export const deCuongActions = {
  ...generateActions(eDeCuongActionsObj, "DE_CUONG"),
  ...generateActionForKey(
    eDeCuongActionsObj,
    "DE_CUONG",
    "SAVE_SUCCESS",
    () => {
      NotifyHelper.Success("Đã Thêm mới");
    }
  ),
  ...generateActionForKey(
    eDeCuongActionsObj,
    "DE_CUONG",
    "UPDATE_SUCCESS",
    () => {
      NotifyHelper.Success("Đã cập nhật");
    }
  ),
  ...generateActionForKey(
    eDeCuongActionsObj,
    "DE_CUONG",
    "SAVE_ERROR",
    (m: string) => {
      NotifyHelper.Error(m);
    }
  ),
};
