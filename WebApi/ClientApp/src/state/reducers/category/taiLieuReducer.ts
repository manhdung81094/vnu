import { ITaiLieuActionTypes } from "../../action-types/category/ITaiLieuActions";
import { ITaiLieuReducer } from "../../reducer-model/category/ITaiLieuReducer";
import { eReducerStatusBase } from "../../reducer-model/eReducerStatusBase";
const iniState: ITaiLieuReducer = {
  status: eReducerStatusBase.is_not_initialization,
  taiLieus: [],
};
export const taiLieuReducer = (
  state: ITaiLieuReducer = iniState,
  action: ITaiLieuActionTypes
): ITaiLieuReducer => {
  switch (action.type) {
    case "TAI_LIEU_LOAD_START":
      return {
        ...state,
        status: eReducerStatusBase.is_loading,
      };
    case "TAI_LIEU_LOAD_SUCCESS":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
        taiLieus: action.payload,
      };
    case "TAI_LIEU_LOAD_ERRR":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
      };
    default:
      return state;
  }
};
