import { call, put, takeLatest } from "redux-saga/effects";
import { IBaseRespone } from "../../../model/respone/IBaseRespone";
import { rootActions } from "../../actions/rootActions";
import { eBaiActionIds } from "../../action-types/de-cuong/IBaiAction";
import { chuongApi } from "../../../api/chuong/chuongApi";


export function* baiSaga(): any {
    yield takeLatest(eBaiActionIds.LOAD_START, loadWorker);
}

function* loadWorker(): any {
    // const res: IBaseRespone = yield call(chuongApi.SelectAll);
    // if (res.is_success) {
    //     yield put(rootActions.deCuong.chuong.LOAD_SUCCESS(res.data));
    // } else {
    //     yield put(rootActions.deCuong.chuong.LOAD_ERROR(res.message ?? "Có lỗi"));
    // }
}
