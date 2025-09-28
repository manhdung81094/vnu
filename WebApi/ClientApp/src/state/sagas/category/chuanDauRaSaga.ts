import { call, put, takeLatest } from "redux-saga/effects";
import { IBaseRespone } from "../../../model/respone/IBaseRespone";
import { rootActions } from "../../actions/rootActions";
import {
  eChuanDauRaActionIds,
  IChuanDauRaActionTypes,
} from "../../action-types/category/IChuanDauRaActions";
import { chuanDauRaApi } from "../../../api/category/chuanDauRaApi";

export function* chuanDauRaSaga(): any {
  yield takeLatest(eChuanDauRaActionIds.LOAD_START, loadWorker);
  yield takeLatest(eChuanDauRaActionIds.SAVE_START, saveWorker);
    yield takeLatest(eChuanDauRaActionIds.DELETE_START, deleteWorker);
}

function* loadWorker(): any {
  const res: IBaseRespone = yield call(chuanDauRaApi.SelectAll);
  if (res.is_success) {
    yield put(rootActions.category.chuanDauRa.LOAD_SUCCESS(res.data));
  } else {
    yield put(
      rootActions.category.chuanDauRa.LOAD_ERRR(res.message ?? "Có lỗi")
    );
  }
}

function* saveWorker(action: IChuanDauRaActionTypes): any {
  let res: IBaseRespone;
  const payload = action.payload as any;
  if (payload.id > 0) {
    res = yield call(chuanDauRaApi.Update, payload);
  } else {
    res = yield call(chuanDauRaApi.Insert, payload);
  }
  if (res) {
    if (res.is_success) {
      yield put(rootActions.category.chuanDauRa.SAVE_SUCCESS(res.data));
    } else {
      yield put(
        rootActions.category.chuanDauRa.SAVE_ERROR(res.message ?? "Có lỗi")
      );
    }
  }
}

function* deleteWorker(action: IChuanDauRaActionTypes): any {
  const res: IBaseRespone = yield call(
    chuanDauRaApi.Delete,
    action.payload as number
  );
  if (res.is_success) {
    yield put(rootActions.category.chuanDauRa.DELETE_SUCCESS(res.data));
  } else {
    yield put(
      rootActions.category.chuanDauRa.DELETE_ERROR(res.message ?? "Có lỗi")
    );
  }
}