import { all } from "redux-saga/effects";
import { chuongSaga } from "./chuongSaga";
import { baiSaga } from "./baiSaga";

export default function* deCuongSagaWrapper() {
    yield all([chuongSaga(), baiSaga()]);
}
