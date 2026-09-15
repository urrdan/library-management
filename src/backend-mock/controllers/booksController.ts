import {
  checkRecordExists,
  createRecordOperation,
  updateRecordOperation,
} from "../utils/records-operations";
import { readStorage, writeStorage } from "../utils/storage-operations";
import { endpoints, messages } from "../utils/constants";
import { delay } from "../utils/delay";
import type { Book, BookStatusFilter } from "src/types/bookTypes";
import { CustomError } from "../utils/error";
import { getBookStatus } from "../utils/get-book-status";
import { DEFAULT_PAGE_SIZE } from "src/utils/constants";

const BOOKS_STORAGE_KEY = endpoints.books;

export async function getBooksController({
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  status = "all",
}: {
  page?: number;
  pageSize?: number;
  status?: BookStatusFilter;
}) {
  try {
    await delay();

    const books = readStorage(BOOKS_STORAGE_KEY);

    let filteredBooks = books;

    if (status !== "all") {
      filteredBooks = books.filter((book) => getBookStatus(book) === status);
    }

    const totalRecords = filteredBooks.length;
    const totalPages = Math.ceil(totalRecords / pageSize);

    const startIndex = (page - 1) * pageSize;

    const data = filteredBooks.slice(startIndex, startIndex + pageSize);

    return {
      data,
      pagination: {
        page,
        pageSize,
        totalRecords,
        totalPages,
      },
    };
  } catch {
    throw new Error(messages.getError);
  }
}

export async function createBookController(
  book: Omit<Book, "id">,
): Promise<string> {
  try {
    await delay();
    const books = readStorage(BOOKS_STORAGE_KEY);
    const updatedBooks = createRecordOperation(books, book);
    writeStorage(BOOKS_STORAGE_KEY, updatedBooks);
    return messages.postSuccess;
  } catch {
    throw new Error(messages.postError);
  }
}

export async function updateBookController(
  id: string,
  updatedFields: Partial<Omit<Book, "id">>,
): Promise<string> {
  try {
    const books = readStorage(BOOKS_STORAGE_KEY);

    if (!checkRecordExists(books, id)) {
      throw new CustomError(messages.notFound);
    }
    const updatedBooks = updateRecordOperation(books, id, updatedFields);
    writeStorage(BOOKS_STORAGE_KEY, updatedBooks);
    return messages.updateSuccess;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error; // business error
    }
    throw new Error(messages.updateError);
  }
}

export async function deleteBookController(id: string) {
  try {
    await delay();
    const books = readStorage(BOOKS_STORAGE_KEY);
    if (!checkRecordExists(books, id)) throw new CustomError(messages.notFound);
    const updatedBooks = books.filter((book) => book.id !== id);
    writeStorage(BOOKS_STORAGE_KEY, updatedBooks);
    return messages.deleteSuccess;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error; // expected/business error
    }
    throw new Error(messages.deleteError); //unexpected
  }
}
