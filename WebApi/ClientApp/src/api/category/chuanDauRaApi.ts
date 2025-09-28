import { apiClient } from "../apiClient";
export const CHUAN_DAU_RA_ENDPOINT = "category/chuan-dau-ra";
export const chuanDauRaApi = {
  SelectAll: () => apiClient.get(`${CHUAN_DAU_RA_ENDPOINT}`),
  Insert: (payload: any) => apiClient.post(`${CHUAN_DAU_RA_ENDPOINT}`, payload),
  Update: (payload: any) => apiClient.put(`${CHUAN_DAU_RA_ENDPOINT}`, payload),
  Delete: (id: number) => apiClient.delete(`${CHUAN_DAU_RA_ENDPOINT}/${id}`),
};
