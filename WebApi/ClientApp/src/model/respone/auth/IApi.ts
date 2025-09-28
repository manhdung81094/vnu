
export interface IApi {
    id: number;
    menu_id: number;
    method: string;
    path: string;
    description: string;
    is_active: boolean;
    sort_idx: string;
}