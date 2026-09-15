import type { Book, BookStatus } from "src/types/bookTypes";
import { LOW_BOOK_STOCK_THRESHOLD } from "src/utils/constants";

export function getBookStatus(book: Book): BookStatus {
  if (book.availableCopies === book.totalCopies) {
    return "available";
  }

  if (
    book.availableCopies > 0 &&
    book.availableCopies <= LOW_BOOK_STOCK_THRESHOLD
  ) {
    return "low-stock";
  }

  return "checked-out";
}
