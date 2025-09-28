import jwt_decode from 'jwt-decode';
import { axiosClient } from './axiosClient';
import { IBaseRespone } from '../model/respone/IBaseRespone';
import { appConst } from '../AppConst';

const apiGuestClient = {
    get: async (path: string): Promise<IBaseRespone> => {
        const url = `${appConst.baseApiURL}/${path}`
        try {
            
            const config = {
                headers: {
                    language: localStorage.getItem("language"),
                }
            }
            const res = await axiosClient.get<any, IBaseRespone>(url, config);
            return res;
        } catch (error: any) {
            return {
                status_code: error.response.data.status_code,
                is_success: false,
                message: error.response.data.message || "Có lỗi"
            };

        }
    }
    ,
    post: async (path: string, data?: any, domain?: string): Promise<IBaseRespone> => {
        const url = `${domain ? domain : appConst.baseApiURL}/${path}`

        try {
            const config = {
                headers: {
                    language: localStorage.getItem("language"),
                }
            }
            const res = await axiosClient.post<any, IBaseRespone>(url, data, config);
            return res;
        } catch (error: any) {
            return {
                status_code: error.response.data.status_code,
                is_success: false,
                message: error.response.data.message || "Có lỗi"
            };

        }
    },
    put: async (path: string, data?: any): Promise<IBaseRespone> => {
        const url = `${appConst.baseApiURL}/${path}`
        try {
            const config = {

                headers: {
                    language: localStorage.getItem("language"),
                }
            }
            const res = await axiosClient.put<any, IBaseRespone>(url, data, config);
            return res;
        } catch (error: any) {
            return {
                status_code: error.response.data.status_code,
                is_success: false,
                message: error.response.data.message || "Có lỗi"
            };
        }
    },
    delete: async (path: string): Promise<IBaseRespone> => {
        const url = `${appConst.baseApiURL}/${path}`
        try {
            
            const config = {
                headers: {
                    language: localStorage.getItem("language"),
                }
            }
            const res = await axiosClient.delete<any, IBaseRespone>(url, config);
            return res;
        } catch (error: any) {
            return {
                status_code: error.response.data.status_code,
                is_success: false,
                message: error.response.data.message || "Có lỗi"
            };

        }
    },
    
}
export { apiGuestClient };
