import { IKhoa } from "../../../model/respone/category/IKhoa";
import { eReducerStatusBase } from "../eReducerStatusBase";

export interface IKhoaReducer {
  status: eReducerStatusBase;
  khoas: IKhoa[];
}
