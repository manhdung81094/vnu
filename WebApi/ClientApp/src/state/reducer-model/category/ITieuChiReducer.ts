import { IDmTieuChi } from "../../../model/respone/category/IDmTieuChi";
import { eReducerStatusBase } from "../eReducerStatusBase";

export interface ITieuChiReducer {
  status: eReducerStatusBase;
  tieuChis: IDmTieuChi[];
}
