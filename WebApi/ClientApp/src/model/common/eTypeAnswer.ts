export enum eTypeAnswer {
  mot_lua_chon = 1,
  nhieu_lua_chon = 2,
  tu_luan = 3,
  sap_xep = 4,
  ghep_dpoi = 5,
  dien_tu = 6,
}

export const eTypeAnswerDic: Record<eTypeAnswer, string> = {
  [eTypeAnswer.mot_lua_chon]: "Một lựa chọn",
  [eTypeAnswer.nhieu_lua_chon]: "Nhiều lựa chọn",
  [eTypeAnswer.tu_luan]: "Tự luận",
  [eTypeAnswer.sap_xep]: "Sắp xếp",
  [eTypeAnswer.ghep_dpoi]: "Ghép đôi",
  [eTypeAnswer.dien_tu]: "Điền từ",
};

export enum eLoaiCauHoi {
  tat_ca = 0,
  trac_nghiem = 1,
  tu_luan = 2,
  dung_sai = 3,
  mot_lua_chon = 4,
  nhieu_lua_chon = 5,
  dien_tu = 6,
  ghep_doi = 7,
}

export const eLoaiCauHoiDic: Record<eLoaiCauHoi, string> = {
  [eLoaiCauHoi.tat_ca]: "Tất cả",
  [eLoaiCauHoi.trac_nghiem]: "Trắc nghiệm",
  [eLoaiCauHoi.tu_luan]: "Tự luận",
  [eLoaiCauHoi.dung_sai]: "Đúng sai",
  [eLoaiCauHoi.mot_lua_chon]: "Một lựa chọn",
  [eLoaiCauHoi.nhieu_lua_chon]: "Nhiều lựa chọn",
  [eLoaiCauHoi.dien_tu]: "Điền từ",
  [eLoaiCauHoi.ghep_doi]: "Ghép đôi",
};

