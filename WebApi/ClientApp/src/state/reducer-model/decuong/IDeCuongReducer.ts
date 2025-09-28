import { GiaoVien } from "../../../model/respone/decuong/GiaoVien";
import { HrLyLich } from "../../../model/respone/decuong/HrLyLich";
import { ICDR_DeCuong } from "../../../model/respone/decuong/ICDR_DeCuong";
import { IDeCuongVm } from "../../../model/respone/decuong/IDeCuongVm";
import { PLAN_ChuongTrinhDaoTaoRangBuoc } from "../../../model/respone/decuong/PLAN_ChuongTrinhDaoTaoRangBuoc";
import { eReducerStatusBase } from "../eReducerStatusBase";

export interface IDeCuongReducer {
  deCuongs: ICDR_DeCuong[];
  status: eReducerStatusBase;
  deCuongEdit?: IDeCuongVm;
  isShowEditModal?: boolean;
  idMon: number;
  idBoMon: number;
  idDeCuong: number;
  htmlContent: string;
  isShowExamModal?: boolean;
  idSelections: number[];
  idProgressSelections: number[];
  isShowProgressModal?: boolean;
  isShowPdModal?: boolean;
  idShowModal?: number;
  examData?: any;
  giaoVienList: GiaoVien[];
  lyLichList: HrLyLich[];
  ctdtList: PLAN_ChuongTrinhDaoTaoRangBuoc[];
}
