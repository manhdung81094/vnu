import { apiClient } from "../apiClient";
export const MON_HOC_ENDPOINT = "category/mon-hoc";
export const monHocApi = {
  SelectAll: () => apiClient.get(`${MON_HOC_ENDPOINT}`),
};
