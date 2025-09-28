import { NotifyHelper } from "../../../helpers/toast";
import { eChuanDauRaActionsObj } from "../../action-types/category/IChuanDauRaActions";
import { generateActionForKey, generateActions } from "../generateActions";

export const chuanDauRaActions = {
  ...generateActions(eChuanDauRaActionsObj, "CHUAN_DAU_RA"),
  ...generateActionForKey(
    eChuanDauRaActionsObj,
    "CHUAN_DAU_RA",
    "SAVE_SUCCESS",
    () => {
      NotifyHelper.Success("Đã Thêm mới");
    }
  ),
  ...generateActionForKey(
    eChuanDauRaActionsObj,
    "DE_CUONG",
    "SAVE_ERROR",
    (m: string) => {
      NotifyHelper.Error(m);
    }
  ),
  // ...generateActionForKey(
  //   eChuanDauRaActionsObj,
  //   "CHUAN_DAU_RA",
  //   "UPDATE_SUCCESS",
  //   () => {
  //     NotifyHelper.Success("Đã cập nhật");
  //   }
  // ),
  ...generateActionForKey(
    eChuanDauRaActionsObj,
    "CHUAN_DAU_RA",
    "DELETE_SUCCESS",
    () => {
      NotifyHelper.Success("Đã xóa");
    }
  ),
  ...generateActionForKey(
    eChuanDauRaActionsObj,
    "CHUAN_DAU_RA",
    "DELETE_ERROR",
    (m: string) => {
      NotifyHelper.Error(m);
    }
  ),
};
