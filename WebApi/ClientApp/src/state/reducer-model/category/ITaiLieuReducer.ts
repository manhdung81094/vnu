import { IDmTaiLieu } from "../../../model/respone/category/IDmTaiLieu";
import { eReducerStatusBase } from "../eReducerStatusBase";

export interface ITaiLieuReducer {
  status: eReducerStatusBase;
  taiLieus: IDmTaiLieu[];
}
