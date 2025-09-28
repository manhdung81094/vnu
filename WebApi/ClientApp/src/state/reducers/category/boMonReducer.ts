import { eReducerStatusBase } from "../../reducer-model/eReducerStatusBase";
import { IBoMonActionTypes } from "../../action-types/category/IBoMonActions";
import { IBoMonReducer } from "../../reducer-model/category/IBoMonReducer";

const iniState: IBoMonReducer = {
  status: eReducerStatusBase.is_not_initialization,
  boMons: [],
};

export const boMonReducer = (
  state: IBoMonReducer = iniState,
  action: IBoMonActionTypes
): IBoMonReducer => {
  switch (action.type) {
    case "BO_MON_LOAD_START":
      return {
        ...state,
        status: eReducerStatusBase.is_loading,
      };
    case "BO_MON_LOAD_SUCCESS":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
        boMons: action.payload,
      };
    case "BO_MON_LOAD_ERRR":
      return {
        ...state,
        status: eReducerStatusBase.is_completed,
      };
    default:
      return state;
  }
};
