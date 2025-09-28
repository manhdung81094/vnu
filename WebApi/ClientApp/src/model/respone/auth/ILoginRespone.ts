import { IProfileRespone } from "./IProfileRespone";
import { ITokenInfo } from "./ITokenInfo";

export interface ILoginRespone {
    token_info: ITokenInfo;
    profile: IProfileRespone;
}