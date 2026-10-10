export type SuccessResponse<T> = {
  data: T;
  message: string | null;
  pagination?: {
    page: number;
    totalPages: number;
    totalRecords: number;
    pageSize: number;
  };
};
