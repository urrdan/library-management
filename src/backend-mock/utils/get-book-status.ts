import type { Book, BookStatus } from "src/types/bookTypes";
import { LOW_BOOK_STOCK_THRESHOLD } from "src/utils/constants";

export function getBookStatus(book: Book): BookStatus {
  if (book.availableCopies >= LOW_BOOK_STOCK_THRESHOLD) {
    return "available";
  }
  if (book.availableCopies === 0) {
    return "checked-out";
  }
  return "low-stock";
}
