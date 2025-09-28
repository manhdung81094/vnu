import { ICDR_CLO } from "./ICDR_CLO";
import { ICDR_DeCuong } from "./ICDR_DeCuong";
import { ICDR_GiangVien } from "./ICDR_GiangVien";
import { ICDR_MoTa } from "./ICDR_MoTa";
import { ICDR_MucTieu } from "./ICDR_MucTieu";
import { ICDR_PhuongPhap } from "./ICDR_PhuongPhap";
import { ICDR_QuyTac } from "./ICDR_QuyTac";
import { ICDR_TaiLieu } from "./ICDR_TaiLieu";
import { IChuongVm } from "./IChuongVm";
import { IDanhGiaVm } from "./IDanhGiaVm";

export interface IDeCuongVm {
  de_cuong: ICDR_DeCuong;
  giang_viens: ICDR_GiangVien[];
  clos: ICDR_CLO[];
  mo_tas: ICDR_MoTa[];
  danh_gias: IDanhGiaVm[];
  tai_lieus: ICDR_TaiLieu[];
  chuongs: IChuongVm[];
  muc_tieus: ICDR_MucTieu[];
  phuong_phaps: ICDR_PhuongPhap[];
  quy_tacs: ICDR_QuyTac[];
}
