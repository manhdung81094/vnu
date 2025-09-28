import { apiClient } from "./apiClient";

const uploadApi = {
  upload: (file: File) => {
    let formData = new FormData();
    formData.append("form_file", file);
    return apiClient.upload(`upload`, formData);
  },
  readSheets: (payload: any) =>
    apiClient.post(`upload/excel/sheets/read`, payload),
  readData: (payload: any) => apiClient.post(`upload/excel/data/read`, payload),
};
export { uploadApi };
