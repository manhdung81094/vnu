import { IChuanDauRaActionTypes } from "../../action-types/category/IChuanDauRaActions";
import { IChuanDauRaReducer } from "../../reducer-model/category/IChuanDauRaReducer";
import { eReducerStatusBase } from "../../reducer-model/eReducerStatusBase";

const iniState: IChuanDauRaReducer = {
  status: eReducerStatusBase.is_not_initialization,
  chuanDauRas: [],
  idChuanDauRa: 0,
  request: { id_loai_cdr: 0 },
};

export const chuanDauRaReducer = (
  state: IChuanDauRaReducer = iniState,
  action: IChuanDauRaActionTypes
): IChuanDauRaReducer => {
  switch (action.type) {
    case "CHUAN_DAU_RA_LOAD_START":
      return {
        ...state,
        status: eReducerStatusBase.is_loading,
      };
    case "CHUAN_DAU_RA_LOAD_SUCCESS":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
        chuanDauRas: action.payload,
      };
    case "CHUAN_DAU_RA_LOAD_ERRR":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
      };
    case "CHUAN_DAU_RA_SHOW_EDIT_MODAL":
      return {
        ...state,
        // idDeCuong: action.payload?.id ?? 0,
        chuanDauRaEdit: action.payload,
        isShowEditModal: true,
      };
    case "CHUAN_DAU_RA_CLOSE_EDIT_MODAL":
      return {
        ...state,
        status: eReducerStatusBase.is_need_reload,
        isShowEditModal: false,
      };

    case "CHUAN_DAU_RA_SAVE_START":
      return {
        ...state,
        status: eReducerStatusBase.is_saving,
      };
    case "CHUAN_DAU_RA_SAVE_SUCCESS":
      return {
        ...state,
        status: eReducerStatusBase.is_need_reload,
        chuanDauRaEdit: undefined,
        isShowEditModal: false,
      };

    case "CHUAN_DAU_RA_SAVE_ERROR":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
      };
    case "CHUAN_DAU_RA_CHANGE_REQUEST":
      return {
        ...state,
        status: eReducerStatusBase.is_need_reload,
        request: {
          ...action.payload,
        },
      };
    case "CHUAN_DAU_RA_DELETE_START":
      return {
        ...state,
        status: eReducerStatusBase.is_deleting,
      };
    case "CHUAN_DAU_RA_DELETE_SUCCESS":
      return {
        ...state,
        status: eReducerStatusBase.is_need_reload,
      };
    default:
      return state;
  }
};
