import { IDeCuongActionTypes } from "../../action-types/decuong/IDeCuongActions";
import { IDeCuongReducer } from "../../reducer-model/decuong/IDeCuongReducer";
import { eReducerStatusBase } from "../../reducer-model/eReducerStatusBase";

const iniState: IDeCuongReducer = {
  status: eReducerStatusBase.is_not_initialization,
  deCuongs: [],
  idMon: 0,
  idBoMon: 0,
  idDeCuong: 0,
  htmlContent: "",
  idSelections: [],
  giaoVienList: [],
  idProgressSelections: [],
  lyLichList: [],
  ctdtList: [],
};

export const DeCuongReducer = (
  state: IDeCuongReducer = iniState,
  action: IDeCuongActionTypes
): IDeCuongReducer => {
  switch (action.type) {
    case "DE_CUONG_LOAD_START":
      return {
        ...state,
        status: eReducerStatusBase.is_loading,
      };
    case "DE_CUONG_LOAD_SUCCESS":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
        deCuongs: action.payload,
        // isShowEditModal: false,
      };
    case "DE_CUONG_LOAD_ERROR":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
      };
    case "DE_CUONG_LOAD_GV_START":
      return {
        ...state,
        status: eReducerStatusBase.is_loading,
      };
    case "DE_CUONG_LOAD_GV_SUCCESS":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
        giaoVienList: action.payload,
        isShowEditModal: false,
      };
    case "DE_CUONG_LOAD_GV_ERROR":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
      };
    case "DE_CUONG_LOAD_CTDT_START":
      return {
        ...state,
        status: eReducerStatusBase.is_loading,
      };
    case "DE_CUONG_LOAD_CTDT_SUCCESS":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
        ctdtList: action.payload,
        isShowEditModal: false,
      };
    case "DE_CUONG_LOAD_CTDT_ERROR":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
      };
    case "DE_CUONG_LOAD_LY_LICH_START":
      return {
        ...state,
        status: eReducerStatusBase.is_loading,
      };
    case "DE_CUONG_LOAD_LY_LICH_SUCCESS":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
        lyLichList: action.payload,
      };
    case "DE_CUONG_LOAD_LY_LICH_ERROR":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
      };

    case "DE_CUONG_LOAD_BY_ID_START":
      return {
        ...state,
      };
    case "DE_CUONG_LOAD_BY_ID_SUCCESS":
      return {
        ...state,
        deCuongEdit: action.payload,
      };
    case "DE_CUONG_LOAD_BY_ID_ERROR":
      return {
        ...state,
      };
    case "DE_CUONG_SHOW_EDIT_MODAL":
      return {
        ...state,
        idDeCuong: action.payload?.id ?? 0,
        isShowEditModal: true,
      };
    case "DE_CUONG_CLOSE_EDIT_MODAL":
      return {
        ...state,
        status: eReducerStatusBase.is_need_reload,
        idDeCuong: 0,
        deCuongEdit: undefined,
        isShowEditModal: false,
      };
    case "DE_CUONG_SAVE_START":
      return {
        ...state,
        status: eReducerStatusBase.is_saving,
      };
    case "DE_CUONG_SAVE_SUCCESS":
      return {
        ...state,
        status: eReducerStatusBase.is_need_reload,
        idDeCuong: 0,
        deCuongEdit: undefined,
        isShowEditModal: false,
      };
    case "DE_CUONG_UPDATE_SUCCESS":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
        // idDeCuong: 0,
        // deCuongEdit: undefined,
        // isShowEditModal: false,
      };
    case "DE_CUONG_SAVE_ERROR":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
      };
    case "DE_CUONG_DELETE_START":
      return {
        ...state,
        status: eReducerStatusBase.is_deleting,
      };
    case "DE_CUONG_DELETE_SUCCESS":
      return {
        ...state,
        status: eReducerStatusBase.is_need_reload,
      };
    case "DE_CUONG_SHOW_EXAM":
      return {
        ...state,
        isShowExamModal: true,
        examData: action.payload,
      };
    case "DE_CUONG_CLOSE_EXAM":
      return {
        ...state,
        isShowExamModal: false,
        htmlContent: "",
        // examData: {} as any,
      };
    case "DE_CUONG_DELETE_ERROR":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
      };
    case "DE_CUONG_VIEW_EXAM_START":
      return {
        ...state,
        status: eReducerStatusBase.is_loading,
      };
    case "DE_CUONG_VIEW_EXAM_SUCCESS":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
        htmlContent: action.payload as string,
      };
    case "DE_CUONG_VIEW_EXAM_ERROR":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
      };
    case "DE_CUONG_SELECTED_ID":
      return {
        ...state,
        idSelections: action.payload,
      };
    case "DE_CUONG_SELECTED_PROGRESS_ID":
      return {
        ...state,
        idProgressSelections: action.payload,
      };
    case "DE_CUONG_SHOW_PROGRESS_MODAL":
      return {
        ...state,
        isShowProgressModal: true,
      };
    case "DE_CUONG_CLOSE_PROGRESS_MODAL":
      return {
        ...state,
        isShowProgressModal: false,
      };

    case "DE_CUONG_SHOW_PD_MODAL":
      return {
        ...state,
        isShowPdModal: true,
        idShowModal: action.payload,
      };
    case "DE_CUONG_CLOSE_PD_MODAL":
      return {
        ...state,
        isShowPdModal: false,
      };
    case "DE_CUONG_PROGRESS_START":
      return {
        ...state,
        status: eReducerStatusBase.is_saving,
      };
    case "DE_CUONG_PROGRESS_SUCCESS":
      return {
        ...state,
        status: eReducerStatusBase.is_need_reload,
        isShowProgressModal: false,
        idSelections: [],
        idProgressSelections: [],
      };
    case "DE_CUONG_PROGRESS_ERROR":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
      };
    default:
      return state;
  }
};
