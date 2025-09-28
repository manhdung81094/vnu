import { IDeCuongProgressRequest } from "../../model/request/decuong/IDeCuongProgressRequest";
import { IDeCuongRequest } from "../../model/request/decuong/IDeCuongRequest";
import { apiClient } from "../apiClient";
export const DE_CUONG_ENDPOINT = "de-cuong";
export const deCuongApi = {
  SelectAll: () => apiClient.get(`${DE_CUONG_ENDPOINT}`),
  Select: (id: number) => apiClient.get(`${DE_CUONG_ENDPOINT}/${id}`),
  Insert: (request: any) => apiClient.post(`${DE_CUONG_ENDPOINT}`, request),
  Update: (payload: any) => apiClient.put(`${DE_CUONG_ENDPOINT}`, payload),
  Delete: (id: number) => apiClient.delete(`${DE_CUONG_ENDPOINT}/${id}`),
  ExportWord: (payload: any) =>
    apiClient.post(`${DE_CUONG_ENDPOINT}/export-word`, payload),
  ExportPdf: (payload: any) =>
    apiClient.post(`${DE_CUONG_ENDPOINT}/export-pdf`, payload),
  Progress: (payload: IDeCuongProgressRequest) =>
    apiClient.post(`${DE_CUONG_ENDPOINT}/progress`, payload),
  ViewDeCuong: (payload: IDeCuongRequest) =>
    apiClient.post(`${DE_CUONG_ENDPOINT}/view-de-cuong/`, payload),
  BoMonDuyet: (payload: any) =>
    apiClient.put(`${DE_CUONG_ENDPOINT}/bo-mon-duyet/${payload.id}`, payload),
  KhoaDuyet: (payload: any) =>
    apiClient.put(`${DE_CUONG_ENDPOINT}/khoa-duyet/${payload.id}`, payload),
  DaoTaoDuyet: (payload: any) =>
    apiClient.put(`${DE_CUONG_ENDPOINT}/dao-tao-duyet/${payload.id}`, payload),
  ListGiangVien:() => apiClient.get(`${DE_CUONG_ENDPOINT}/giao-vien`),
  ListLyLich:() => apiClient.get(`${DE_CUONG_ENDPOINT}/ly-lich`),
  ListChuongTrinhDaoTao:() => apiClient.get(`${DE_CUONG_ENDPOINT}/chuong-trinh-dao-tao`),
};
