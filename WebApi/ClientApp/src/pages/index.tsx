import { LazyPage } from "../components-ui/loadable";

export const HomePage = LazyPage(import("./home"));
export const BoMonPage = LazyPage(import("./category/bo-mon"));
export const MonHocPage = LazyPage(import("./category/mon-hoc"));
export const GiaoVienPage = LazyPage(import("./category/giao-vien"));
export const ChuanDauRaPage = LazyPage(import("./category/chuan-dau-ra"));
export const DeCuongPage = LazyPage(import("./decuong"));
export const ChuongPage = LazyPage(import("./chuong"));
export const PheDuyetPage = LazyPage(import("./pheduyet"));
