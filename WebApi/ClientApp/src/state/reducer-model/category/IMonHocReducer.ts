import { IMonHocRequest } from "../../../model/request/category/IMonHocRequest";
import { IMonHoc } from "../../../model/respone/category/IMonHoc";
import { eReducerStatusBase } from "../eReducerStatusBase";

export interface IMonHocReducer {
  status: eReducerStatusBase;
  monhocs: IMonHoc[];
  request: IMonHocRequest;
}
