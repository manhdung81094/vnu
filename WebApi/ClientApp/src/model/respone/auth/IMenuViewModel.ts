import { IMenu } from "./IMenu";

export interface IMenuViewModel extends IMenu {
    items: IMenuViewModel[];
}