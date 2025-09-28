import { call, put, takeLatest } from "redux-saga/effects";
import { heApi } from "../../../api/category/heApi";
import { IBaseRespone } from "../../../model/respone/IBaseRespone";
import { eDmHeActionIds } from "../../action-types/category/IDmHeActions";
import { rootActions } from "../../actions/rootActions";

export function* heSaga(): any {
  yield takeLatest(eDmHeActionIds.LOAD_START, loadWorker);
}

function* loadWorker(): any {
  const res: IBaseRespone = yield call(heApi.SelectAll);
  if (res.is_success) {
    yield put(rootActions.category.he.LOAD_SUCCESS(res.data));
  } else {
    yield put(
      rootActions.category.he.LOAD_ERRR(res.message ?? "Có lỗi")
    );
  }
}
