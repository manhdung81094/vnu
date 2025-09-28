import { call, put, takeLatest } from "redux-saga/effects";
import { IBaseRespone } from "../../../model/respone/IBaseRespone";
import { rootActions } from "../../actions/rootActions";
import { taiLieuApi } from "../../../api/category/taiLieuApi";
import { eTaiLieuActionIds } from "../../action-types/category/ITaiLieuActions";

export function* taiLieuSaga(): any {
  yield takeLatest(eTaiLieuActionIds.LOAD_START, loadWorker);
}

function* loadWorker(): any {
  const res: IBaseRespone = yield call(taiLieuApi.SelectAll);
  if (res.is_success) {
    yield put(rootActions.category.taiLieu.LOAD_SUCCESS(res.data));
  } else {
    yield put(rootActions.category.taiLieu.LOAD_ERRR(res.message ?? "Có lỗi"));
  }
}
