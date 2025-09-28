import { combineReducers } from "redux";
import { authReducer } from "./auth/authReducer";
import { layoutReducer } from "./common/layoutReducer";
import { monHocReducer } from "./category/monHocReducer";
import { boMonReducer } from "./category/boMonReducer";
import { giaoVienReducer } from "./category/giaoVienReducer";
import { DeCuongReducer } from "./decuong/deCuongReducer";
import { nganhReducer } from "./category/nganhReducer";
import { heReducer } from "./category/heReducer";
import { tieuChiReducer } from "./category/tieuChiReducer";
import { mucDoReducer } from "./category/mucDoReducer";
import { taiLieuReducer } from "./category/taiLieuReducer";
import { chuongReducer } from "./de-cuong/chuongReducer";
import { chuanDauRaReducer } from "./category/chuanDauRaReducer";
import { khoaReducer } from "./category/khoaReducer";

const reducers = combineReducers({
  auth: authReducer,
  common: combineReducers({
    layout: layoutReducer,
  }),
  category: combineReducers({
    monHoc: monHocReducer,
    boMon: boMonReducer,
    giaoVien: giaoVienReducer,
    nganh: nganhReducer,
    he: heReducer,
    tieuChi: tieuChiReducer,
    mucDo: mucDoReducer,
    taiLieu: taiLieuReducer,
    chuanDauRa: chuanDauRaReducer,
    khoa: khoaReducer,
  }),
  deCuong: combineReducers({
    deCuong: DeCuongReducer,
    chuong: chuongReducer,
  }),
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
