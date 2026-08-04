import {
  checkRecordExists,
  createRecordOperation,
  updateRecordOperation,
} from "../utils/records-operations";
import { readStorage, writeStorage } from "../utils/storage-operations";
import { endpoints, messages } from "../utils/constants";
import { delay } from "../utils/delay";
import { NotFoundError, rethrowError } from "../utils/error";
import type { Book } from "src/types/types";

const BOOKS_STORAGE_KEY = endpoints.books;

export async function getBooksController() {
  try {
    await delay();
    const books = readStorage(BOOKS_STORAGE_KEY);
    return books;
  } catch (error) {
    rethrowError(error, messages.getError);
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
  } catch (error) {
    rethrowError(error, messages.postError);
  }
}

export async function updateBookController(
  id: string,
  updatedFields: Partial<Omit<Book, "id">>,
): Promise<string> {
  try {
    await delay();
    const books = readStorage(BOOKS_STORAGE_KEY);

    if (!checkRecordExists(books, id)) {
      throw new NotFoundError(messages.notFound);
    }
    const updatedBooks = updateRecordOperation(books, id, updatedFields);
    writeStorage(BOOKS_STORAGE_KEY, updatedBooks);
    return messages.updateSuccess;
  } catch (error) {
    rethrowError(error, messages.updateError);
  }
}

export async function deleteBookController(id: string) {
  try {
    await delay();
    const books = readStorage(BOOKS_STORAGE_KEY);
    if (!checkRecordExists(books, id))
      throw new NotFoundError(messages.notFound);
    const updatedBooks = books.filter((book) => book.id !== id);
    writeStorage(BOOKS_STORAGE_KEY, updatedBooks);
    return messages.deleteSuccess;
  } catch (error) {
    rethrowError(error, messages.deleteError);
  }
}
