import { IDeCuongActionTypes } from "./../../action-types/decuong/IDeCuongActions";
import { call, put, takeLatest } from "redux-saga/effects";
import { IBaseRespone } from "../../../model/respone/IBaseRespone";
import { rootActions } from "../../actions/rootActions";
import { deCuongApi } from "../../../api/decuong/deCuongApi";
import { eDeCuongActionIds } from "../../action-types/decuong/IDeCuongActions";
import { IDeCuongProgressRequest } from "../../../model/request/decuong/IDeCuongProgressRequest";

export function* deCuongSaga(): any {
  yield takeLatest(eDeCuongActionIds.LOAD_START, loadWorker);
  yield takeLatest(eDeCuongActionIds.LOAD_GV_START, loadGvWorker);
  yield takeLatest(eDeCuongActionIds.LOAD_CTDT_START, loadCtDtWorker);
  yield takeLatest(eDeCuongActionIds.LOAD_LY_LICH_START, loadLyLichWorker);
  yield takeLatest(eDeCuongActionIds.LOAD_BY_ID_START, loadByIdWorker);
  yield takeLatest(eDeCuongActionIds.SAVE_START, saveWorker);
  yield takeLatest(eDeCuongActionIds.DELETE_START, deleteWorker);
  yield takeLatest(eDeCuongActionIds.PROGRESS_START, progressWorker);
  yield takeLatest(eDeCuongActionIds.VIEW_EXAM_START, viewExamWorker);
}

function* loadWorker(): any {
  const res: IBaseRespone = yield call(deCuongApi.SelectAll);
  if (res.is_success) {
    yield put(rootActions.deCuong.deCuong.LOAD_SUCCESS(res.data));
  } else {
    yield put(rootActions.deCuong.deCuong.LOAD_ERROR(res.message ?? "Có lỗi"));
  }
}
function* loadGvWorker(): any {
  const res: IBaseRespone = yield call(deCuongApi.ListGiangVien);
  if (res.is_success) {
    yield put(rootActions.deCuong.deCuong.LOAD_GV_SUCCESS(res.data));
  } else {
    yield put(
      rootActions.deCuong.deCuong.LOAD_GV_ERROR(res.message ?? "Có lỗi")
    );
  }
}
function* loadCtDtWorker(): any {
  const res: IBaseRespone = yield call(deCuongApi.ListChuongTrinhDaoTao);
  if (res.is_success) {
    yield put(rootActions.deCuong.deCuong.LOAD_CTDT_SUCCESS(res.data));
  } else {
    yield put(
      rootActions.deCuong.deCuong.LOAD_CTDT_ERROR(res.message ?? "Có lỗi")
    );
  }
}
function* loadLyLichWorker(): any {
  const res: IBaseRespone = yield call(deCuongApi.ListLyLich);
  if (res.is_success) {
    yield put(rootActions.deCuong.deCuong.LOAD_LY_LICH_SUCCESS(res.data));
  } else {
    yield put(
      rootActions.deCuong.deCuong.LOAD_LY_LICH_ERROR(res.message ?? "Có lỗi")
    );
  }
}

function* loadByIdWorker(action: IDeCuongActionTypes): any {
  const res: IBaseRespone = yield call(
    deCuongApi.Select,
    action.payload as number
  );
  if (res.is_success) {
    yield put(rootActions.deCuong.deCuong.LOAD_BY_ID_SUCCESS(res.data));
  } else {
    yield put(
      rootActions.deCuong.deCuong.LOAD_BY_ID_ERROR(res.message ?? "Có lỗi")
    );
  }
}

function* saveWorker(action: IDeCuongActionTypes): any {
  let res: IBaseRespone;
  const payload = action.payload as any;

  if (payload?.de_cuong?.id > 0) {
    res = yield call(deCuongApi.Update, payload);
  } else {
    res = yield call(deCuongApi.Insert, payload);
  }
  if (res) {
    if (res.is_success && !(payload.de_cuong.id > 0)) {
      yield put(rootActions.deCuong.deCuong.SAVE_SUCCESS(res.data));
    }
    if (res.is_success && payload.de_cuong.id > 0) {
      yield put(rootActions.deCuong.deCuong.UPDATE_SUCCESS(res.data));
    }
    if (!res.is_success) {
      yield put(
        rootActions.deCuong.deCuong.SAVE_ERROR(res.message ?? "Có lỗi")
      );
    }
  }
}

function* deleteWorker(action: IDeCuongActionTypes): any {
  const res: IBaseRespone = yield call(
    deCuongApi.Delete,
    action.payload as number
  );
  if (res.is_success) {
    yield put(rootActions.deCuong.deCuong.DELETE_SUCCESS(res.data));
  } else {
    yield put(
      rootActions.deCuong.deCuong.DELETE_ERROR(res.message ?? "Có lỗi")
    );
  }
}

function* progressWorker(action: IDeCuongActionTypes): any {
  const res: IBaseRespone = yield call(
    deCuongApi.Progress,
    action.payload as IDeCuongProgressRequest
  );
  if (res.is_success) {
    yield put(rootActions.deCuong.deCuong.PROGRESS_SUCCESS(undefined));
  } else {
    yield put(
      rootActions.deCuong.deCuong.PROGRESS_ERROR(res.message ?? "Có lỗi")
    );
  }
}

function* viewExamWorker(action: IDeCuongActionTypes): any {
  const res: IBaseRespone = yield call(
    deCuongApi.ViewDeCuong,
    action.payload as any
  );
  console.log("API Response:", res);
  if (res.is_success) {
    yield put(rootActions.deCuong.deCuong.VIEW_EXAM_SUCCESS(res.data));
  } else {
    yield put(
      rootActions.deCuong.deCuong.VIEW_EXAM_ERROR(res.message ?? "Có lỗi")
    );
  }
}
