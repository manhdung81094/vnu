export interface IPagingResult<T> {
    total_count: number,
    page_count: number,
    page_number: number,
    page_size: number,
    data: T
}