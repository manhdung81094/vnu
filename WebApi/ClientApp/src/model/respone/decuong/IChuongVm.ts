import { ICDR_Chuong } from "./ICDR_Chuong";
import { ICDR_Chuong_Sub } from "./ICDR_Chuong_Sub";

export interface IChuongVm extends ICDR_Chuong {
  chuongSub: ICDR_Chuong_Sub[];
}
