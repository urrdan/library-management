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

export type BookInputForm = {
  //id: string;
  title: string;
  totalCopies: string;
  availableCopies: string;
  genre: string;
  author: string;
  pages: string;
  isbn: string;
  coverImageUrl?: string;
  releasedDate: string;
};
export type BookStatus = "available" | "checked-out" | "low-stock";
export type BookStatusFilter = BookStatus | "all";
