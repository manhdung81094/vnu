import { call, put, takeLatest } from "redux-saga/effects";
import { boMonApi } from "../../../api/category/boMonApi";
import { IBaseRespone } from "../../../model/respone/IBaseRespone";
import { rootActions } from "../../actions/rootActions";
import { eBoMonActionIds } from "../../action-types/category/IBoMonActions";

export function* boMonSaga(): any {
  yield takeLatest(eBoMonActionIds.LOAD_START, loadWorker);
}

function* loadWorker(): any {
  const res: IBaseRespone = yield call(boMonApi.SelectAll);
  if (res.is_success) {
    yield put(rootActions.category.boMon.LOAD_SUCCESS(res.data));
  } else {
    yield put(rootActions.category.boMon.LOAD_ERRR(res.message ?? "Có lỗi"));
  }
}
