import { all } from "redux-saga/effects";
import { authSaga } from "./auth/authSaga";
import categorySagaWrapper from "./category/categorySaga";
import deCuongSagaWrapper from "./de-cuong/deCuongSagaWrapper";
import { deCuongSaga } from "./decuong/deCuongSaga";

export default function* rootSaga() {
    yield all([authSaga(), categorySagaWrapper(), deCuongSaga(), deCuongSagaWrapper()]);
}
