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
