import { apiClient } from "../apiClient";
export const BO_MON_ENDPOINT = "category/bo-mon";
export const boMonApi = {
  SelectAll: () => apiClient.get(`${BO_MON_ENDPOINT}`),
};
