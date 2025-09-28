import { ILoginRequest } from "../../../model/request/auth/ILoginRequest";
import { ILoginRespone } from "../../../model/respone/auth/ILoginRespone";
import { IProfileRespone } from "../../../model/respone/auth/IProfileRespone";
import { ITokenInfo } from "../../../model/respone/auth/ITokenInfo";
import { generateActionTypeIds } from "../generateActionTypeIds";
import IGenericActionType from "../IGenericActionType";

export const eAuthActionTypeDefine = {
    GET_USER_INFO_START: undefined,
    GET_USER_INFO_SUCCESS: {} as IProfileRespone,
    GET_USER_INFO_ERROR: "",

    LOGIN_START: {} as ILoginRequest,
    LOGIN_SUCCESS: {} as ILoginRespone,
    LOGIN_ERROR: "",

    LOGOUT_START: {} as ITokenInfo,
    LOGOUT_SUCCESS: undefined,
    LOGOUT_ERROR: "",


}
export const eAuthActionTypeIds = generateActionTypeIds(eAuthActionTypeDefine, "AUTH")

export type IAuthActions = IGenericActionType<typeof eAuthActionTypeDefine, "AUTH">