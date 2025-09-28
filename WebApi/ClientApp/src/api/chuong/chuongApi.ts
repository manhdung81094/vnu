import { ICDR_Chuong } from "../../model/respone/decuong/ICDR_Chuong";
import { apiClient } from "../apiClient";
export const CHUONG_ENDPOINT = "chuong";
export const chuongApi = {
  Select: (id: number) => apiClient.get(`${CHUONG_ENDPOINT}/${id}`),
  SelectById: (id: number) => apiClient.get(`${CHUONG_ENDPOINT}/select-by-id/${id}`),
  Insert: (payload: ICDR_Chuong) =>
    apiClient.post(`${CHUONG_ENDPOINT}`, payload),
  Update: (payload: ICDR_Chuong) =>
    apiClient.put(`${CHUONG_ENDPOINT}`, payload),
  Delete: (id: number) => apiClient.delete(`${CHUONG_ENDPOINT}/${id}`),
};
