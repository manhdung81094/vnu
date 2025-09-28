import { ILoginRequest } from "../../model/request/auth/ILoginRequest";
import { apiClient } from "../apiClient";
import { apiGuestClient } from "../apiGuestClient";

export const authApi = {
    getUser: () => apiClient.get('account/info'),
    logIn: (request: ILoginRequest) => {
        return apiGuestClient.post(`account/login`, request)
    }

}