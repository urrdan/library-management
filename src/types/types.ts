import type { endpoints } from "src/utils/constants";

//books
export type Book = {
  id: string;
  title: string;
  totalCopies: number;
  availableCopies: number;
  genre: string;
  author: string;
  pages: number;
  isbn: string;
  coverImageUrl?: string;
  releasedDate: string;
};
export type EditableBook = Omit<Book, "id">;

//rental
export type Rental = {
  id: string;
  bookId: string;
  bookTitle: string;
  customerId: string;
  customerName: string;
  staffId: string;
  staffName: string;
  rentedDate: string;
  returnDate: string;
};

//endpoints
export type SuccessResponse<T> = {
  data: T;
  message: string | null;
};
