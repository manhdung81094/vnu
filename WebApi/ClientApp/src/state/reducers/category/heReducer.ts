
import { IDmHeActionTypes } from "../../action-types/category/IDmHeActions";
import { IDmHeReducer } from "../../reducer-model/category/IDmHeReducer";
import { eReducerStatusBase } from "../../reducer-model/eReducerStatusBase";
const iniState: IDmHeReducer = {
  status: eReducerStatusBase.is_not_initialization,
  hes: [],
};
export const heReducer = (
  state: IDmHeReducer = iniState,
  action: IDmHeActionTypes
): IDmHeReducer => {
  switch (action.type) {
    case "HE_LOAD_START":
      return {
        ...state,
        status: eReducerStatusBase.is_loading,
      };
    case "HE_LOAD_SUCCESS":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
        hes: action.payload,
      };
    case "HE_LOAD_ERRR":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
      };
    default:
      return state;
  }
};
