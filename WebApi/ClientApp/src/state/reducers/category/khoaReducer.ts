import { eReducerStatusBase } from "../../reducer-model/eReducerStatusBase";
import { IKhoaActionTypes } from "../../action-types/category/IKhoaActions";
import { IKhoaReducer } from "../../reducer-model/category/IKhoaReducer";

const iniState: IKhoaReducer = {
  status: eReducerStatusBase.is_not_initialization,
  khoas: [],
};

export const khoaReducer = (
  state: IKhoaReducer = iniState,
  action: IKhoaActionTypes
): IKhoaReducer => {
  switch (action.type) {
    case "KHOA_LOAD_START":
      return {
        ...state,
        status: eReducerStatusBase.is_loading,
      };
    case "KHOA_LOAD_SUCCESS":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
        khoas: action.payload,
      };
    case "KHOA_LOAD_ERRR":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
      };
    default:
      return state;
  }
};
