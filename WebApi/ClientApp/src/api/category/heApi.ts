import { apiClient } from "../apiClient";
export const HE_ENDPOINT = "he";
export const heApi = {
  SelectAll: () => apiClient.get(`${HE_ENDPOINT}`),
};
