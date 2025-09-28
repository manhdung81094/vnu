import { ITieuChiActionTypes } from "../../action-types/category/ITieuChiActions";
import { ITieuChiReducer } from "../../reducer-model/category/ITieuChiReducer";
import { eReducerStatusBase } from "../../reducer-model/eReducerStatusBase";
const iniState: ITieuChiReducer = {
  status: eReducerStatusBase.is_not_initialization,
  tieuChis: [],
};
export const tieuChiReducer = (
  state: ITieuChiReducer = iniState,
  action: ITieuChiActionTypes
): ITieuChiReducer => {
  switch (action.type) {
    case "TIEU_CHI_LOAD_START":
      return {
        ...state,
        status: eReducerStatusBase.is_loading,
      };
    case "TIEU_CHI_LOAD_SUCCESS":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
        tieuChis: action.payload,
      };
    case "TIEU_CHI_LOAD_ERRR":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
      };
    default:
      return state;
  }
};
