import { eNavSubMode } from "../../../model/common/eNavSubMode";
import { eThemeMode } from "../../../model/common/eThemeMode";
import { IMenuViewModel } from "../../../model/respone/auth/IMenuViewModel";

export interface ILayoutReducer {
  themeMode: eThemeMode;
  navSubMode: eNavSubMode;
  moduleSelected?: IMenuViewModel;
  hoc_ky: number;
  nam_hoc: string;
  ky_dang_ky: number;
}
