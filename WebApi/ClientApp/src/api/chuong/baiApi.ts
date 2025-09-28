import { apiClient } from "../apiClient";
export const BAI_ENDPOINT = "bai";
export const baiApi = {
  SelectAll: () => apiClient.get(`${BAI_ENDPOINT}`),
};
