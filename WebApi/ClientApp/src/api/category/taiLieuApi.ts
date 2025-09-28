import { apiClient } from "../apiClient";
export const TAI_LIEU_ENDPOINT = "category/tai-lieu";
export const taiLieuApi = {
  SelectAll: () => apiClient.get(`${TAI_LIEU_ENDPOINT}`),
};
