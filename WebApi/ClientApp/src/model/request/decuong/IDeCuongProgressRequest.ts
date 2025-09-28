import { eProgress } from "../../common/eProgress";

export interface IDeCuongProgressRequest {
  id_decuongs: number[];
  content?: string;
  status: eProgress;
}
