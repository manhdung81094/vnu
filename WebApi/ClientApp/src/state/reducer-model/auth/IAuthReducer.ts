import { IProfileRespone } from "../../../model/respone/auth/IProfileRespone"
import { eReducerStatusBase } from "../eReducerStatusBase"
export enum eAuthStatus {
    is_loging = "is_loging",
    is_login_success = "is_login_success",
    is_login_error = "is_login_error",
    is_logout = "is_logout",
}
export interface IAuthReducer {
    status?: eReducerStatusBase |eAuthStatus,
    user?: IProfileRespone
}