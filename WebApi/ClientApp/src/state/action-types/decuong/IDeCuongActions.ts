import { IDeCuongProgressRequest } from "../../../model/request/decuong/IDeCuongProgressRequest";
import { GiaoVien } from "../../../model/respone/decuong/GiaoVien";
import { HrLyLich } from "../../../model/respone/decuong/HrLyLich";
import { ICDR_DeCuong } from "../../../model/respone/decuong/ICDR_DeCuong";
import { IDeCuongVm } from "../../../model/respone/decuong/IDeCuongVm";
import { PLAN_ChuongTrinhDaoTaoRangBuoc } from "../../../model/respone/decuong/PLAN_ChuongTrinhDaoTaoRangBuoc";
import { generateActionTypeIds } from "../generateActionTypeIds";
import IGenericActionType from "../IGenericActionType";

export const eDeCuongActionsObj = {
  LOAD_START: undefined,
  LOAD_SUCCESS: {} as ICDR_DeCuong[],
  LOAD_ERROR: "",

  LOAD_CTDT_START: undefined,
  LOAD_CTDT_SUCCESS: {} as PLAN_ChuongTrinhDaoTaoRangBuoc[],
  LOAD_CTDT_ERROR: "",

  LOAD_GV_START: undefined,
  LOAD_GV_SUCCESS: {} as GiaoVien[],
  LOAD_GV_ERROR: "",

  LOAD_LY_LICH_START: undefined,
  LOAD_LY_LICH_SUCCESS: {} as HrLyLich[],
  LOAD_LY_LICH_ERROR: "",

  LOAD_BY_ID_START: 0,
  LOAD_BY_ID_SUCCESS: {} as IDeCuongVm,
  LOAD_BY_ID_ERROR: "",

  SAVE_START: {} as IDeCuongVm,
  SAVE_SUCCESS: {} as IDeCuongVm,
  UPDATE_SUCCESS: {} as IDeCuongVm,
  SAVE_ERROR: "",

  DELETE_START: 0,
  DELETE_SUCCESS: undefined,
  DELETE_ERROR: "",

  SHOW_EDIT_MODAL: {} as undefined | ICDR_DeCuong,
  CLOSE_EDIT_MODAL: undefined,

  SHOW_EXAM: {} as any,
  CLOSE_EXAM: undefined,
  VIEW_EXAM_START: {} as any,
  VIEW_EXAM_SUCCESS: "",
  VIEW_EXAM_ERROR: "",

  SELECTED_ID: [] as number[],
  SELECTED_PROGRESS_ID: [] as number[],

  SHOW_PROGRESS_MODAL: {} as number[],
  CLOSE_PROGRESS_MODAL: undefined,

  SHOW_PD_MODAL: {} as any,
  CLOSE_PD_MODAL: undefined,

  PROGRESS_START: {} as IDeCuongProgressRequest,
  PROGRESS_SUCCESS: undefined,
  PROGRESS_ERROR: "",
};
export const eDeCuongActionIds = generateActionTypeIds(
  eDeCuongActionsObj,
  "DE_CUONG"
);
export type IDeCuongActionTypes = IGenericActionType<
  typeof eDeCuongActionsObj,
  "DE_CUONG"
>;
