import { IApi } from "./IApi";
import { IMenuViewModel } from "./IMenuViewModel";

export interface IProfileRespone {
  id: string;
  username: string;
  full_name: string;
  role: string;
  avatar?: string;
  menus: IMenuViewModel[];
  apis: IApi[];
}
