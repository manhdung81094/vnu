import { IDmChuanDauRa } from "../../../model/respone/category/IDmChuanDauRa";
import { eReducerStatusBase } from "../eReducerStatusBase";

export interface IChuanDauRaReducer {
  status: eReducerStatusBase;
  chuanDauRas: IDmChuanDauRa[];
  chuanDauRaEdit?: IDmChuanDauRa;
  isShowEditModal?: boolean;
  idChuanDauRa: number;
  request: any;
}
