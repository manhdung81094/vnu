import { eReducerStatusBase } from "../../reducer-model/eReducerStatusBase";
import { IGiaoVienReducer } from "../../reducer-model/category/IGiaoVienReducer";
import { IGiaovienActionTypes } from "../../action-types/category/IGiaoVienActions";
import { IGiaoVienRequest } from "../../../model/request/category/IGiaoVienRequest";

const iniState: IGiaoVienReducer = {
  status: eReducerStatusBase.is_not_initialization,
  giaoViens: [],
  request: {} as IGiaoVienRequest,
};

export const giaoVienReducer = (
  state: IGiaoVienReducer = iniState,
  action: IGiaovienActionTypes
): IGiaoVienReducer => {
  switch (action.type) {
    case "GIAO_VIEN_LOAD_START":
      return {
        ...state,
        status: eReducerStatusBase.is_loading,
      };
    case "GIAO_VIEN_LOAD_SUCCESS":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
        giaoViens: action.payload,
      };
    case "GIAO_VIEN_LOAD_ERRR":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
      };
    case "GIAO_VIEN_CHANGE_REQUEST":
      return {
        ...state,
        status: eReducerStatusBase.is_need_reload,
        request: {
          ...state.request,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
