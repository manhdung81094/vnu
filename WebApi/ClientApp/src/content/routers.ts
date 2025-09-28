import {
  HomePage,
  BoMonPage,
  MonHocPage,
  GiaoVienPage,
  DeCuongPage,
  ChuongPage,
  PheDuyetPage,
  ChuanDauRaPage,
} from "../pages";

const routes = [
  {
    path: "/home",
    component: HomePage,
  },
  {
    path: "/bo-mon",
    component: BoMonPage,
  },
  {
    path: "/mon-hoc",
    component: MonHocPage,
  },
  {
    path: "/giao-vien",
    component: GiaoVienPage,
  },
  {
    path: "/de-cuong",
    component: DeCuongPage,
  },
  {
    path: "/chuong",
    component: ChuongPage,
  },
  {
    path: "/chuan-dau-ra",
    component: ChuanDauRaPage,
  },
  {
    path: "/phe-duyet",
    component: PheDuyetPage,
  },
];
export default routes.map((route) => {
  return {
    ...route,
  };
});
