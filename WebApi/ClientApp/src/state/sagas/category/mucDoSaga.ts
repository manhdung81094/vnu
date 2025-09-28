import { call, put, takeLatest } from "redux-saga/effects";
import { IBaseRespone } from "../../../model/respone/IBaseRespone";
import { eMucDoActionIds } from "../../action-types/category/IMucDoActions";
import { rootActions } from "../../actions/rootActions";
import { mucDoApi } from "../../../api/category/mucDoApi";

export function* mucDoSaga(): any {
  yield takeLatest(eMucDoActionIds.LOAD_START, loadWorker);
}

function* loadWorker(): any {
  const res: IBaseRespone = yield call(mucDoApi.SelectAll);
  if (res.is_success) {
    yield put(rootActions.category.mucDo.LOAD_SUCCESS(res.data));
  } else {
    yield put(rootActions.category.mucDo.LOAD_ERRR(res.message ?? "Có lỗi"));
  }
}
