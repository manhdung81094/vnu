import { call, put, takeLatest } from "redux-saga/effects";
import { IBaseRespone } from "../../../model/respone/IBaseRespone";
import { rootActions } from "../../actions/rootActions";
import { tieuChiApi } from "../../../api/category/tieuChiApi";
import { eTieuChiActionIds } from "../../action-types/category/ITieuChiActions";

export function* tieuChiSaga(): any {
  yield takeLatest(eTieuChiActionIds.LOAD_START, loadWorker);
}

function* loadWorker(): any {
  const res: IBaseRespone = yield call(tieuChiApi.SelectAll);
  if (res.is_success) {
    yield put(rootActions.category.tieuChi.LOAD_SUCCESS(res.data));
  } else {
    yield put(rootActions.category.tieuChi.LOAD_ERRR(res.message ?? "Có lỗi"));
  }
}
