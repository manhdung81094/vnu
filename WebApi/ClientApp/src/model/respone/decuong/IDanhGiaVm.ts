import { ICDR_DanhGia } from "./ICDR_DanhGia";
import { ICDR_DanhGia_Sub } from "./ICDR_DanhGia_Sub";
import { ICDR_DanhGia_Sub2 } from "./ICDR_DanhGia_Sub2";

export interface IDanhGiaVm extends ICDR_DanhGia {
  subs: ICDR_DanhGia_Sub;
}

// export interface IDanhGiaSubVm extends ICDR_DanhGia_Sub {
//   sub2s: ICDR_DanhGia_Sub2[];
// }
