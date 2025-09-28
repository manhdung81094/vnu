

import { ICDR_Chuong } from "../../../model/respone/decuong/ICDR_Chuong";
import { IChuongActionTypes } from "../../action-types/de-cuong/IChuongAction";
import { IChuongReducer } from "../../reducer-model/de-cuong/IChuongReducer";
import { eReducerStatusBase } from "../../reducer-model/eReducerStatusBase";

const iniState: IChuongReducer = {
    status: eReducerStatusBase.is_not_initialization,
    chuongList: [],
    chuongSelected: {} as ICDR_Chuong,
};

export const chuongReducer = (
    state: IChuongReducer = iniState,
    action: IChuongActionTypes
): IChuongReducer => {
    switch (action.type) {
        case "CHUONG_LOAD_START":
            return {
                ...state,
                status: eReducerStatusBase.is_loading,
            };
        case "CHUONG_LOAD_SUCCESS":
            return {
                ...state,
                status: eReducerStatusBase.is_completed,
                chuongList: action.payload,
            };
        case "CHUONG_LOAD_ERROR":
            return {
                ...state,
                status: eReducerStatusBase.is_completed,
            };
        case "CHUONG_LOAD_BY_ID_START":
            return {
                ...state,
            };
        case "CHUONG_LOAD_BY_ID_SUCCESS":
            return {
                ...state,
                chuongSelected: action.payload,
            };
        case "CHUONG_LOAD_BY_ID_ERROR":
            return {
                ...state,
            };
        case "CHUONG_SAVE_START":
            return {
                ...state,
                status: eReducerStatusBase.is_saving,
            };
        case "CHUONG_SAVE_SUCCESS":
            return {
                ...state,
                status: eReducerStatusBase.is_need_reload,
                chuongSelected: action.payload,
                isShowEditModal: false,
            };
        case "CHUONG_SAVE_ERROR":
            return {
                ...state,
                status: eReducerStatusBase.is_completed,
            };
        case "CHUONG_DELETE_START":
            return {
                ...state,
                status: eReducerStatusBase.is_deleting,
            };
        case "CHUONG_DELETE_SUCCESS":
            return {
                ...state,
                chuongSelected: {} as ICDR_Chuong,
                status: eReducerStatusBase.is_need_reload,
            };
        case "CHUONG_DELETE_ERROR":
            return {
                ...state,
                status: eReducerStatusBase.is_completed,
            };
        case "CHUONG_SHOW_EDIT_MODAL":
            return {
                ...state,
                chuongEditData: action.payload,
                isShowEditModal: true,
            };
        case "CHUONG_CLOSE_EDIT_MODAL":
            return {
                ...state,
                chuongEditData: undefined,
                isShowEditModal: false,
            };
        default:
            return state;
    }
};
