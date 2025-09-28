import { call, put, takeLatest } from "redux-saga/effects";

import { IBaseRespone } from "../../../model/respone/IBaseRespone";
import { rootActions } from "../../actions/rootActions";
import { eKhoaActionIds } from "../../action-types/category/IKhoaActions";
import { khoaApi } from "../../../api/category/khoaApi";

export function* khoaSaga(): any {
  yield takeLatest(eKhoaActionIds.LOAD_START, loadWorker);
}

function* loadWorker(): any {
  const res: IBaseRespone = yield call(khoaApi.SelectAll);
  if (res.is_success) {
    yield put(rootActions.category.khoa.LOAD_SUCCESS(res.data));
  } else {
    yield put(rootActions.category.khoa.LOAD_ERRR(res.message ?? "Có lỗi"));
  }
}
