import { apiClient } from "../apiClient";
export const TIEU_CHI_ENDPOINT = "category/tieu-chi";
export const tieuChiApi = {
  SelectAll: () => apiClient.get(`${TIEU_CHI_ENDPOINT}`),
};
