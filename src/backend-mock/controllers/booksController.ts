import {
  checkRecordExists,
  createRecordOperation,
  updateRecordOperation,
} from "../utils/records-operations";
import { readStorage, writeStorage } from "../utils/storage-operations";
import { messages } from "../utils/constants";
import { delay } from "../utils/delay";
import type { Book } from "src/types/types";
import { endpoints } from "src/api/mockAPI";

const BOOKS_STORAGE_KEY = endpoints.books;

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}
export async function getBooksController() {
  try {
    await delay();
    const books = readStorage(BOOKS_STORAGE_KEY);
    return books;
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
      throw new NotFoundError(messages.notFound);
    }
    const updatedBooks = updateRecordOperation(books, id, updatedFields);
    writeStorage(BOOKS_STORAGE_KEY, updatedBooks);
    return messages.updateSuccess;
  } catch (error) {
    throw error;
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
    if (error instanceof NotFoundError) {
      throw error; // expected/business error
    }
    throw new Error(messages.deleteError); //unexpected
  }
}
