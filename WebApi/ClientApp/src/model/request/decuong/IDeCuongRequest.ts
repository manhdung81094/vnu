import { ICDR_CLO } from "../../respone/decuong/ICDR_CLO";
import { ICDR_DeCuong } from "../../respone/decuong/ICDR_DeCuong";
import { ICDR_GiangVien } from "../../respone/decuong/ICDR_GiangVien";
import { ICDR_MoTa } from "../../respone/decuong/ICDR_MoTa";
import { ICDR_MucTieu } from "../../respone/decuong/ICDR_MucTieu";
import { ICDR_PhuongPhap } from "../../respone/decuong/ICDR_PhuongPhap";
import { ICDR_QuyTac } from "../../respone/decuong/ICDR_QuyTac";
import { ICDR_TaiLieu } from "../../respone/decuong/ICDR_TaiLieu";
import { IChuongVm } from "../../respone/decuong/IChuongVm";
import { IDanhGiaVm } from "../../respone/decuong/IDanhGiaVm";

export interface IDeCuongRequest {
  de_cuong: IDeCuong;
  giang_viens: IGiangVien[];
  clos: ICDR_CLO[];
  mo_tas: ICDR_MoTa[];
  danh_gias: IDanhGiaVm[];
  tai_lieus: ICDR_TaiLieu[];
  chuongs: IChuongVm[];
  muc_tieus: ICDR_MucTieu[];
  phuong_phaps: ICDR_PhuongPhap[];
  quy_tacs: ICDR_QuyTac[];
}

export interface IDeCuong extends ICDR_DeCuong {
  // ten_he: string;
  // ten_nganh: string;
  // ten_bm: string;
  ten_mon: string;
  ten_mon_en: string;
  ma_hoc_phan: string;
}

export interface IGiangVien extends ICDR_GiangVien {
  ten_cb: string;
  // email: string;
  // phone_number: string;
  // don_vi_cong_tac: string;
}
