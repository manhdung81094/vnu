import { IGiaoVienRequest } from "../../../model/request/category/IGiaoVienRequest";
import { IGiaoVien } from "../../../model/respone/category/IGiaoVien";
import { eReducerStatusBase } from "../eReducerStatusBase";

export interface IGiaoVienReducer {
  status: eReducerStatusBase;
  giaoViens: IGiaoVien[];
  request: IGiaoVienRequest;
}
