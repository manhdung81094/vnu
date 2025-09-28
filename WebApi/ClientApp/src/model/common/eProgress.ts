export enum eProgress {
  khoi_tao = 0,
  gui_duyet = 1,
  duyet = 2,
  tu_choi = 3,
  tra_lai = 4,
}

export const eProgressDic: Record<eProgress, string> = {
  [eProgress.khoi_tao]: "Khởi tạo",
  [eProgress.gui_duyet]: "Gửi duyệt",
  [eProgress.duyet]: "Duyệt",
  [eProgress.tu_choi]: "Từ chối",
  [eProgress.tra_lai]: "Trả lại",
};


export enum eRole {
  bo_mon = 0,
  khoa = 1,
  pdt = 2,
}

export const eRoleDic: Record<eRole, string> = {
  [eRole.bo_mon]: "Trưởng bộ môn",
  [eRole.khoa]: "Trưởng khoa",
  [eRole.pdt]: "Phòng đào tạo",
};
