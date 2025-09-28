import { apiClient } from "../apiClient";
export const KHOA_ENDPOINT = "khoa";
export const khoaApi = {
  SelectAll: () => apiClient.get(`${KHOA_ENDPOINT}`),
};
