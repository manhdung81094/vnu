import { apiClient } from "../apiClient";
export const MUC_DO_ENDPOINT = "category/muc-do";
export const mucDoApi = {
  SelectAll: () => apiClient.get(`${MUC_DO_ENDPOINT}`),
};
