import { IBoMon } from "../../../model/respone/category/IBoMon";
import { eReducerStatusBase } from "../eReducerStatusBase";

export interface IBoMonReducer {
  status: eReducerStatusBase;
  boMons: IBoMon[];
}
