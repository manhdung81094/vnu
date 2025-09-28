import { IDmTaiLieu } from "../category/IDmTaiLieu";
import { ICDR_TaiLieu } from "./ICDR_TaiLieu";

export interface ITaiLieuVm extends ICDR_TaiLieu {
  info: IDmTaiLieu;
}
