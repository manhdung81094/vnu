import { IBaiActionTypes } from "../../action-types/de-cuong/IBaiAction";
import { IBaiReducer } from "../../reducer-model/de-cuong/IBaiReducer";
import { eReducerStatusBase } from "../../reducer-model/eReducerStatusBase";



const iniState: IBaiReducer = {
    status: eReducerStatusBase.is_not_initialization,
    baiList: [],
};

export const baiReducer = (
    state: IBaiReducer = iniState,
    action: IBaiActionTypes
): IBaiReducer => {
    switch (action.type) {
        case "BAI_LOAD_START":
            return {
                ...state,
                status: eReducerStatusBase.is_loading,
            };
        case "BAI_LOAD_SUCCESS":
            return {
                ...state,
                status: eReducerStatusBase.is_completed,
                baiList: action.payload,
            };
        case "BAI_LOAD_ERROR":
            return {
                ...state,
                status: eReducerStatusBase.is_completed,
            };
        case "BAI_SAVE_START":
            return {
                ...state,
                status: eReducerStatusBase.is_saving,
            };
        case "BAI_SAVE_SUCCESS":
            return {
                ...state,
                status: eReducerStatusBase.is_need_reload,
                isShowEditModal: false,
            };
        case "BAI_SAVE_ERROR":
            return {
                ...state,
                status: eReducerStatusBase.is_completed,
            };
        case "BAI_DELETE_START":
            return {
                ...state,
                status: eReducerStatusBase.is_deleting,
            };
        case "BAI_DELETE_SUCCESS":
            return {
                ...state,
                status: eReducerStatusBase.is_need_reload,
            };
        case "BAI_DELETE_ERROR":
            return {
                ...state,
                status: eReducerStatusBase.is_completed,
            };
        default:
            return state;
    }
};
