import { authAction } from "./auth/authAction";
import { boMonActions } from "./category/boMonActions";
import { chuanDauRaActions } from "./category/chuanDauRaActions";
import { giaoVienActions } from "./category/giaoVienActions";
import { heActions } from "./category/heActions";
import { khoaActions } from "./category/khoaActions";
import { monHocActions } from "./category/monHocActions";
import { mucDoActions } from "./category/mucDoActions";
import { nganhActions } from "./category/nganhActions";
import { taiLieuActions } from "./category/taiLieuActions";
import { tieuChiActions } from "./category/tieuChiActions";
import { layoutActions } from "./common/layoutActions";
import { baiActions } from "./de-cuong/baiActions";
import { chuongActions } from "./de-cuong/chuongActions";
import { deCuongActions } from "./decuong/deCuongActions";

export const rootActions = {
  auth: authAction,
  common: {
    layout: layoutActions,
  },
  category: {
    monHoc: monHocActions,
    boMon: boMonActions,
    giaoVien: giaoVienActions,
    nganh: nganhActions,
    he: heActions,
    tieuChi: tieuChiActions,
    mucDo: mucDoActions,
    taiLieu: taiLieuActions,
    chuanDauRa: chuanDauRaActions,
    khoa: khoaActions,
  },
  deCuong: {
    deCuong: deCuongActions,
    chuong: chuongActions,
    bai: baiActions,
  },
};
