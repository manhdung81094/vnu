import { call, put, takeLatest } from "redux-saga/effects";
import { monHocApi } from "../../../api/category/monHocApi";
import { IBaseRespone } from "../../../model/respone/IBaseRespone";
import { rootActions } from "../../actions/rootActions";
import { eMonHocActionIds } from "../../action-types/category/IMonHocActions";

export function* monHocSaga(): any {
  yield takeLatest(eMonHocActionIds.LOAD_START, loadWorker);
}

function* loadWorker(): any {
  const res: IBaseRespone = yield call(monHocApi.SelectAll);
  if (res.is_success) {
    yield put(rootActions.category.monHoc.LOAD_SUCCESS(res.data));
  } else {
    yield put(rootActions.category.monHoc.LOAD_ERRR(res.message ?? "Có lỗi"));
  }
}
