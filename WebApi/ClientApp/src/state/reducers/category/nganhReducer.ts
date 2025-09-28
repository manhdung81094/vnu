import { IDmNganhActionTypes } from "../../action-types/category/IDmNganhActions";
import { IDmNganhReducer } from "../../reducer-model/category/IDmNganhReducer";
import { eReducerStatusBase } from "../../reducer-model/eReducerStatusBase";
const iniState: IDmNganhReducer = {
  status: eReducerStatusBase.is_not_initialization,
  nganhs: [],
};
export const nganhReducer = (
  state: IDmNganhReducer = iniState,
  action: IDmNganhActionTypes
): IDmNganhReducer => {
  switch (action.type) {
    case "NGANH_LOAD_START":
      return {
        ...state,
        status: eReducerStatusBase.is_loading,
      };
    case "NGANH_LOAD_SUCCESS":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
        nganhs: action.payload,
      };
    case "NGANH_LOAD_ERRR":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
      };
    default:
      return state;
  }
};
