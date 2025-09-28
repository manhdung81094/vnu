import { IDmMucDo } from "../../../model/respone/category/IDmMucDo";
import { eReducerStatusBase } from "../eReducerStatusBase";

export interface IMucDoReducer {
  status: eReducerStatusBase;
  mucDos: IDmMucDo[];
}
