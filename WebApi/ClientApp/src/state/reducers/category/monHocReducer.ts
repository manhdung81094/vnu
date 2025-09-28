import { eReducerStatusBase } from "../../reducer-model/eReducerStatusBase";
import { IMonHocActionTypes } from "../../action-types/category/IMonHocActions";
import { IMonHocReducer } from "../../reducer-model/category/IMonHocReducer";
import { IMonHocRequest } from "../../../model/request/category/IMonHocRequest";

const iniState: IMonHocReducer = {
  status: eReducerStatusBase.is_not_initialization,
  monhocs: [],
  request: {} as IMonHocRequest,
};

export const monHocReducer = (
  state: IMonHocReducer = iniState,
  action: IMonHocActionTypes
): IMonHocReducer => {
  switch (action.type) {
    case "MON_HOC_LOAD_START":
      return {
        ...state,
        status: eReducerStatusBase.is_loading,
      };
    case "MON_HOC_LOAD_SUCCESS":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
        monhocs: action.payload,
      };
    case "MON_HOC_LOAD_ERRR":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
      };
    case "MON_HOC_CHANGE_REQUEST":
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
