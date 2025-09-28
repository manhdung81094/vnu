export interface IGiaoVien {
  id_cb: string;
  ma_cb: string;
  ho_ten: string;
  id_gioi_tinh: number;
  ngay_sinh?: Date | null;
  id_dv: number;
  ten_don_vi: string;
  id_khoa: number;
  ten_khoa: string;
  id_bm: number;
  ten_bo_mon: string;
  dien_thoai: string;
  email: string;
  hoc_ham:string;
  don_vi_cong_tac: string;
}
