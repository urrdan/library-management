export const API_TIMEOUT = 500;
export const endpoints = {
  books: "books",
  rentals: "rentals",
  customers: "customers",
  staff: "staff",
} as const; //urls source of truth

export const messages = {
  getError: "Error: Fetching Resource",
  postSuccess: "Success: Record Added.",
  postError: "Error: Creating Resource!",
  updateSuccess: "Success: Record updated.",
  updateError: "Error: Updating Resource!",
  deleteSuccess: "Success: Record deleted.",
  deleteError: "Error: Deleting Resource!",
  notFound: "Resource not found",
  defaultError: "Unexpected error",
  storageUnavailable: "Error: Storage is unavailable",
  storageCorrupted: "Error: Stored data is corrupted",
  storageWriteFailed: "Error: Could not save data",
};
