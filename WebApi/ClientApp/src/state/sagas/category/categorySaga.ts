import { all } from "redux-saga/effects";
import { monHocSaga } from "./monHocSaga";
import { boMonSaga } from "./boMonSaga";
import { giaoVienSaga } from "./giaoVienSaga";
import { heSaga } from "./heSaga";
import { nganhSaga } from "./nganhSaga";
import { mucDoSaga } from "./mucDoSaga";
import { tieuChiSaga } from "./tieuChiSaga";
import { taiLieuSaga } from "./taiLieuSaga";
import { chuanDauRaSaga } from "./chuanDauRaSaga";

export default function* categorySagaWrapper() {
  yield all([
    monHocSaga(),
    boMonSaga(),
    giaoVienSaga(),
    heSaga(),
    nganhSaga(),
    mucDoSaga(),
    tieuChiSaga(),
    taiLieuSaga(),
    chuanDauRaSaga(),
  ]);
}
