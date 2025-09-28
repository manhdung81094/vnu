export interface ICDR_DeCuong {
  id: number;
  ten_de_cuong?: string;
  id_mon: number;
  // id_nganh: number;
  // id_bm: number;
  // id_he: number;
  // so_quyet_dinh: string;
  // ngay_quyet_dinh: Date;
  // ngay_ban_hanh: Date;
  // nguoi_quyet_dinh: string;
  id_mon_tien_quyet: number;
  id_mon_ke_tiep: number;
  // lan_ban_hanh: number;
  // dieu_kien_thuc_hien: string;
  is_nop: boolean;
  is_bm_duyet: boolean;
  user_bm_duyet: string;
  is_khoa_duyet: boolean;
  user_khoa_duyet: string;
  is_pdt_duyet?: boolean;
  user_pdt_duyet?: string;
  status: number;
  so_tin_chi: number;
  loai_hoc_phan: number;
  yeu_cau?: string;
  phuong_thuc?: string;
  created_user_id?: string;
  created_time?: Date;
  user_gui_duyet?: string;
  ngay_gui_duyet?: Date;
  noi_dung_bm_duyet?: string;
  noi_dung_khoa_duyet?: string;
  noi_dung_pdt_duyet?: string;

}
