import { apiClient } from "../apiClient";
export const NGANH_ENDPOINT = "nganh";
export const nganhApi = {
  SelectAll: () => apiClient.get(`${NGANH_ENDPOINT}`),
};
