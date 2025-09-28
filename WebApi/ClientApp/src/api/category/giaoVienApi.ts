import { apiClient } from "../apiClient";
export const GIAO_VIEN_ENDPOINT = "category/giao-vien";
export const giaoVienApi = {
  SelectAll: () => apiClient.get(`${GIAO_VIEN_ENDPOINT}`),
};
