import { call, put, takeLatest } from "redux-saga/effects";
import { IBaseRespone } from "../../../model/respone/IBaseRespone";
import { eDmNganhActionIds } from "../../action-types/category/IDmNganhActions";
import { rootActions } from "../../actions/rootActions";
import { nganhApi } from "../../../api/category/nganhApi";

export function* nganhSaga(): any {
  yield takeLatest(eDmNganhActionIds.LOAD_START, loadWorker);
}

function* loadWorker(): any {
  const res: IBaseRespone = yield call(nganhApi.SelectAll);
  if (res.is_success) {
    yield put(rootActions.category.nganh.LOAD_SUCCESS(res.data));
  } else {
    yield put(rootActions.category.nganh.LOAD_ERRR(res.message ?? "Có lỗi"));
  }
}
