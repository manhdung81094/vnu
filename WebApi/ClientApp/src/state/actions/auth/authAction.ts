import {
  clearAccessToken,
  clearRefreshToken,
  saveAccessToken,
  saveRefreshToken,
} from "../../../api/apiClient";
import { ILoginRespone } from "../../../model/respone/auth/ILoginRespone";
import { eAuthActionTypeDefine } from "../../action-types/auth/IAuthActions";
import { generateActionForKey, generateActions } from "../generateActions";

export const authAction = {
  ...generateActions(eAuthActionTypeDefine, "AUTH"),
  ...generateActionForKey(
    eAuthActionTypeDefine,
    "AUTH",
    "LOGIN_SUCCESS",
    (payload: ILoginRespone) => {
      saveAccessToken(payload.token_info.access_token);
      saveRefreshToken(payload.token_info.refresh_token);
    }
  ),
  ...generateActionForKey(
    eAuthActionTypeDefine,
    "AUTH",
    "LOGOUT_START",
    (payload: any) => {
      clearAccessToken();
      clearRefreshToken();
    }
  ),
};
