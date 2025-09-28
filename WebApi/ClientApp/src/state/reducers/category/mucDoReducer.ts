import { IMucDoActionTypes } from "../../action-types/category/IMucDoActions";
import { IMucDoReducer } from "../../reducer-model/category/IMucDoReducer";
import { eReducerStatusBase } from "../../reducer-model/eReducerStatusBase";
const iniState: IMucDoReducer = {
  status: eReducerStatusBase.is_not_initialization,
  mucDos: [],
};
export const mucDoReducer = (
  state: IMucDoReducer = iniState,
  action: IMucDoActionTypes
): IMucDoReducer => {
  switch (action.type) {
    case "MUC_DO_LOAD_START":
      return {
        ...state,
        status: eReducerStatusBase.is_loading,
      };
    case "MUC_DO_LOAD_SUCCESS":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
        mucDos: action.payload,
      };
    case "MUC_DO_LOAD_ERRR":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
      };
    default:
      return state;
  }
};
