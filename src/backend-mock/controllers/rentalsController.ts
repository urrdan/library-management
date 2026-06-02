import {
  createRecordOperation,
  updateRecordOperation,
} from "../utils/records-operations";
import { readStorage, writeStorage } from "../utils/storage-operations";
import { messages } from "../utils/constants";
import { delay } from "../utils/delay";
import type { Book, Rental } from "src/types/types";
import { endpoints } from "src/api/mockAPI";

const RENTALS_STORAGE_KEY = endpoints.rentals;
const BOOK_STORAGE_KEY = endpoints.books;
class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export async function getRentalsController() {
  try {
    await delay();
    const rentals = readStorage(RENTALS_STORAGE_KEY);
    return rentals;
  } catch {
    throw new Error(messages.getError);
  }
}

export async function createRentalController(
  newRental: Omit<Rental, "id">,
): Promise<string> {
  try {
    await delay();
    const rentals = readStorage(RENTALS_STORAGE_KEY);
    const updatedRentals = createRecordOperation(rentals, newRental);
    const updateBooks = updateAvailableCopies(newRental.bookId, "reduce");
    writeStorage(BOOK_STORAGE_KEY, updateBooks);
    writeStorage(RENTALS_STORAGE_KEY, updatedRentals);
    return messages.postSuccess;
  } catch {
    throw new Error(messages.postError);
  }
}

export async function updateRentalController(
  id: string,
  updatedFields: Partial<Omit<Rental, "id">>,
): Promise<string> {
  try {
    const rentals = readStorage(RENTALS_STORAGE_KEY);

    const rentalToBeUpdated = rentals.find((rental) => rental.id === id);

    if (!rentalToBeUpdated) {
      throw new NotFoundError(messages.notFound);
    }

    if (
      updatedFields.bookId &&
      updatedFields.bookId !== rentalToBeUpdated.bookId
    ) {
      let updateBooks = updateAvailableCopies(updatedFields.bookId, "reduce");
      updateBooks = updateAvailableCopies(
        rentalToBeUpdated.bookId,
        "add",
        updateBooks,
      );
      writeStorage(BOOK_STORAGE_KEY, updateBooks);
    }
    const updatedRentals = updateRecordOperation(rentals, id, updatedFields);
    writeStorage(RENTALS_STORAGE_KEY, updatedRentals);
    return messages.updateSuccess;
  } catch (error) {
    throw error;
  }
}

export async function deleteRentalController(id: string) {
  try {
    await delay();
    const rentals = readStorage(RENTALS_STORAGE_KEY);
    const rentalToDelete = rentals.find((rental) => rental.id === id);
    if (!rentalToDelete) throw new NotFoundError(messages.notFound);
    const updatedRentals = rentals.filter((rental) => rental.id !== id);
    const updateBooks = updateAvailableCopies(rentalToDelete.bookId, "add");
    writeStorage(BOOK_STORAGE_KEY, updateBooks);
    writeStorage(RENTALS_STORAGE_KEY, updatedRentals);
    return messages.deleteSuccess;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error; // business error
    }
    throw new Error(messages.deleteError); //unexpected
  }
}

function updateAvailableCopies(
  bookId: string,
  operation: "add" | "reduce",
  books?: Book[],
) {
  books = books || readStorage(BOOK_STORAGE_KEY);
  const bookToBeUpdated = books.find((book) => book.id === bookId);
  if (bookToBeUpdated) {
    let updatedAvailableCopies = bookToBeUpdated.availableCopies;
    if (
      bookToBeUpdated.availableCopies < bookToBeUpdated.totalCopies &&
      operation === "add"
    )
      updatedAvailableCopies = bookToBeUpdated.availableCopies + 1;
    else if (operation === "reduce" && bookToBeUpdated.availableCopies > 0)
      updatedAvailableCopies = bookToBeUpdated.availableCopies - 1;

    let updatedBooks = updateRecordOperation(books, bookId, {
      ...bookToBeUpdated,
      availableCopies: updatedAvailableCopies,
    });
    return updatedBooks;
  }
  return books;
}
