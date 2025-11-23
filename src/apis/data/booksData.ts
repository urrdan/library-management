export interface bookDataType {
  bookId?: number | null;
  title: string;
  inStore: number | null;
  totalCopies: number | null;
  genre: string;
  author: string;
  pages: number | null;
}

export const bookDataTemplate = {
  title: "",
  inStore: null,
  totalCopies: null,
  genre: "",
  author: "",
  pages: null,
};

export const booksData: bookDataType[] = [
  {
    bookId: 12,
    title: "Jane with 12 eggs",
    inStore: 23,
    totalCopies: 23,
    genre: "Crime",
    author: "John Grisham",
    pages: 438,
  },
  {
    bookId: 2,
    title: "The Firm",
    genre: "Crime",
    author: "John Grisham",
    inStore: 9,
    totalCopies: 12,
    pages: 438,
  },
  {
    bookId: 3,
    title: "The Witch And Twelve Slaves",
    genre: "Crime",
    author: "John Grisham",
    inStore: 7,
    totalCopies: 8,
    pages: 438,
  },
  {
    bookId: 4,
    title: "A Narrow Escape",
    genre: "Crime",
    author: "John Grisham",
    inStore: 3,
    totalCopies: 6,
    pages: 438,
  },
  {
    bookId: 5,
    title: "Marie Has A Secrete",
    genre: "Crime",
    author: "John Grisham",
    inStore: 11,
    totalCopies: 16,
    pages: 438,
  },
];
