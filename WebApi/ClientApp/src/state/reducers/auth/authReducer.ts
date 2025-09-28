import { IAuthActions } from "../../action-types/auth/IAuthActions"
import { eAuthStatus, IAuthReducer } from "../../reducer-model/auth/IAuthReducer"
import { eReducerStatusBase } from "../../reducer-model/eReducerStatusBase"
import { menusSample } from "./menusSample"

const iniState: IAuthReducer = {
    // user: {
    //     id: 1,
    //     full_name: "Vũ Thiên Hải",
    //     username: "haivt",
    //     avatar: "https://lh3.googleusercontent.com/-RTgwpduuZW8/AAAAAAAAAAI/AAAAAAAAAAA/ALKGfkma7pNw0WcATIybid7kcRLRvS9e-w/photo.jpg?sz=46",
    //     menus: menusSample,
    //     apis: []

    // }
}
export const authReducer = (state: IAuthReducer = iniState, action: IAuthActions): IAuthReducer => {
    switch (action.type) {
        case "AUTH_GET_USER_INFO_START":
            return {
                ...state,
                status: eReducerStatusBase.is_loading
            }
        case "AUTH_GET_USER_INFO_SUCCESS":
            return {
                ...state,
                status: eReducerStatusBase.is_completed,
                user: {
                    ...action.payload,
                    menus: menusSample
                }
            }
        case "AUTH_GET_USER_INFO_ERROR":
            return {
                ...state,
                status: eReducerStatusBase.is_completed,
                user: undefined
            }
        case "AUTH_LOGIN_START":
            return {
                ...state,
                status: eAuthStatus.is_loging
            }
        case "AUTH_LOGIN_SUCCESS":
            return {
                ...state,
                status: eAuthStatus.is_login_success,
                user: {
                    ...action.payload.profile,
                    menus: menusSample
                }
            }
        case "AUTH_LOGIN_ERROR":
            return {
                ...state,
                status: eAuthStatus.is_login_error,
                user: undefined
            }
        case "AUTH_LOGOUT_START":
            return {
                ...state,
                status: eAuthStatus.is_logout,
                user: undefined
            }
        case "AUTH_LOGOUT_SUCCESS":
        case "AUTH_LOGOUT_ERROR":

        default:
            return {
                ...state
            }
    }
}