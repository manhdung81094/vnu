import { IDmNganh } from "../../../model/respone/category/IDmNganh";
import { eReducerStatusBase } from "../eReducerStatusBase";

export interface IDmNganhReducer {
  status: eReducerStatusBase;
  nganhs: IDmNganh[];
  nganhSelected?: IDmNganh;
  nganhEditing?: IDmNganh;
  isShowEditModal?: boolean;
}
