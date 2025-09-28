import { call, put, takeLatest } from "redux-saga/effects";
import { eChuongActionIds, IChuongActionTypes } from "../../action-types/de-cuong/IChuongAction";
import { IBaseRespone } from "../../../model/respone/IBaseRespone";
import { chuongApi } from "../../../api/chuong/chuongApi";
import { rootActions } from "../../actions/rootActions";
import { ICDR_Chuong } from "../../../model/respone/decuong/ICDR_Chuong";


export function* chuongSaga(): any {
    yield takeLatest(eChuongActionIds.LOAD_START, loadWorker);
    yield takeLatest(eChuongActionIds.LOAD_BY_ID_START, loadByIdWorker);
    yield takeLatest(eChuongActionIds.SAVE_START, saveWorker);
    yield takeLatest(eChuongActionIds.DELETE_START, deleteWorker);
}

function* loadWorker(action: IChuongActionTypes): any {
    const res: IBaseRespone = yield call(chuongApi.Select, action.payload as number);
    if (res.is_success) {
        yield put(rootActions.deCuong.chuong.LOAD_SUCCESS(res.data));
    } else {
        yield put(rootActions.deCuong.chuong.LOAD_ERROR(res.message ?? "Có lỗi"));
    }
}

function* loadByIdWorker(action: IChuongActionTypes): any {
    const res: IBaseRespone = yield call(chuongApi.SelectById, action.payload as number);
    if (res.is_success) {
        yield put(rootActions.deCuong.chuong.LOAD_BY_ID_SUCCESS(res.data));
    } else {
        yield put(rootActions.deCuong.chuong.LOAD_BY_ID_ERROR(res.message ?? "Có lỗi"));
    }
}

function* saveWorker(action: IChuongActionTypes): any {
    let res: IBaseRespone;
    const payload = action.payload as ICDR_Chuong;

    if (payload.id > 0) {
        res = yield call(chuongApi.Update, payload);
    } else {
        res = yield call(chuongApi.Insert, payload);
    }
    if (res) {
        if (res.is_success) {
            yield put(rootActions.deCuong.chuong.SAVE_SUCCESS(res.data));
        } else {
            yield put(
                rootActions.deCuong.chuong.SAVE_ERROR(res.message ?? "Có lỗi")
            );
        }
    }
}

function* deleteWorker(action: IChuongActionTypes): any {
  const res: IBaseRespone = yield call(
    chuongApi.Delete,
    action.payload as number
  );
  if (res.is_success) {
    yield put(rootActions.deCuong.chuong.DELETE_SUCCESS(res.data));
  } else {
    yield put(
      rootActions.deCuong.chuong.DELETE_ERROR(res.message ?? "Có lỗi")
    );
  }
}