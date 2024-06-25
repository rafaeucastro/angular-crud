export interface Page<T> {
    data: T[];
    totalElements: number;
    totalPages: number;
}