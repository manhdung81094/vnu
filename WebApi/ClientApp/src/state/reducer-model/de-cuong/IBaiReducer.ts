import { ICDR_Bai } from "../../../model/respone/decuong/ICDR_Bai";
import { eReducerStatusBase } from "../eReducerStatusBase";

export interface IBaiReducer {
    status: eReducerStatusBase;
    baiList: ICDR_Bai[];
    isShowEditModal?: boolean;
}
