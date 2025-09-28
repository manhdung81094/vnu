import { call, put, takeLatest } from "redux-saga/effects";
import { giaoVienApi } from "../../../api/category/giaoVienApi";
import { IBaseRespone } from "../../../model/respone/IBaseRespone";
import { rootActions } from "../../actions/rootActions";
import { eGiaovienActionIds } from "../../action-types/category/IGiaoVienActions";

export function* giaoVienSaga(): any {
  yield takeLatest(eGiaovienActionIds.LOAD_START, loadWorker);
}

function* loadWorker(): any {
  const res: IBaseRespone = yield call(giaoVienApi.SelectAll);
  if (res.is_success) {
    yield put(rootActions.category.giaoVien.LOAD_SUCCESS(res.data));
  } else {
    yield put(rootActions.category.giaoVien.LOAD_ERRR(res.message ?? "Có lỗi"));
  }
}
