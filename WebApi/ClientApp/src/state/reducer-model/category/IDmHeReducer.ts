import { IDmHe } from "../../../model/respone/category/IDmHe";
import { eReducerStatusBase } from "../eReducerStatusBase";

export interface IDmHeReducer {
    status: eReducerStatusBase;
    hes: IDmHe[];
    
}
