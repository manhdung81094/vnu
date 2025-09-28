import { ICDR_Chuong } from "../../../model/respone/decuong/ICDR_Chuong";
import { eReducerStatusBase } from "../eReducerStatusBase";

export interface IChuongReducer {
    status: eReducerStatusBase;
    chuongList: ICDR_Chuong[];
    chuongSelected: ICDR_Chuong;
    isShowEditModal?: boolean;
    chuongEditData?: ICDR_Chuong;
}
