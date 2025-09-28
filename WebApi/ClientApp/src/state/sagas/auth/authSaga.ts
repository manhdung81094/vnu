import { call, put, takeLatest } from "redux-saga/effects";
import { authApi } from "../../../api/auth/authApi";
import { ILoginRequest } from "../../../model/request/auth/ILoginRequest";
import { IBaseRespone } from "../../../model/respone/IBaseRespone";
import {
  eAuthActionTypeIds,
  IAuthActions,
} from "../../action-types/auth/IAuthActions";
import { rootActions } from "../../actions/rootActions";

export function* authSaga(): any {
  yield takeLatest(eAuthActionTypeIds.LOGIN_START, loginWorker);
  yield takeLatest(eAuthActionTypeIds.GET_USER_INFO_START, getDetailWorker);
}

function* loginWorker(action: IAuthActions): any {
  const res: IBaseRespone = yield call(
    authApi.logIn,
    action.payload as ILoginRequest
  );
  if (res.is_success) {
    yield put(rootActions.auth.LOGIN_SUCCESS(res.data));
  } else {
    yield put(rootActions.auth.LOGIN_ERROR(res.message ?? "Có lỗi"));
  }
}

function* getDetailWorker(action: IAuthActions): any {
  const res: IBaseRespone = yield call([authApi, authApi.getUser]);
  if (res.is_success) {
    yield put(rootActions.auth.GET_USER_INFO_SUCCESS(res.data));
  } else {
    yield put(rootActions.auth.GET_USER_INFO_ERROR(res.message ?? "Có lỗi"));
  }
}
