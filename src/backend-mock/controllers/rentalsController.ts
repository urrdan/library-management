import {
  createRecordOperation,
  deleteRecord,
  updateRecordOperation,
} from "../utils/records-operations";
import { readStorage, writeStorage } from "../utils/storage-operations";
import { endpoints, messages } from "../utils/constants";
import { delay } from "../utils/delay";
import { CustomError, rethrowBusinessError } from "../utils/error";
import type { Rental, RentalEditable } from "src/types/rentalTypes";
import type { Book } from "src/types/bookTypes";
import { createCrudController } from "./createCrudController";

const RENTALS_STORAGE_KEY = endpoints.rentals;
const BOOK_STORAGE_KEY = endpoints.books;

const rentalsCrud = createCrudController<
  typeof endpoints.rentals,
  RentalEditable
>(RENTALS_STORAGE_KEY);

/**
 * Rentals cannot reuse the generic create/update/delete: every write also
 * has to keep the available copies of the rented book in sync.
 */
export const rentalsController = {
  getAll: rentalsCrud.getAll,
  create,
  update,
  remove,
  returnRental,
  undoReturn,
};

async function create(newRental: RentalEditable): Promise<string> {
  try {
    await delay();
    const rentals = readStorage(RENTALS_STORAGE_KEY);
    const systemFields = { returnedDate: null }; //uneditable system fields
    const updatedRentals = createRecordOperation(rentals, {
      ...systemFields,
      ...newRental,
    });
    writeStorage(
      BOOK_STORAGE_KEY,
      updateBookAvailableCopies(newRental.bookId, "reduce"),
    );
    writeStorage(RENTALS_STORAGE_KEY, updatedRentals);
    return messages.postSuccess;
  } catch (error) {
    rethrowBusinessError(error, messages.postError);
  }
}

async function update(
  id: string,
  updatedFields: Partial<RentalEditable>,
): Promise<string> {
  try {
    await delay();
    const rentals = readStorage(RENTALS_STORAGE_KEY);
    const rentalToBeUpdated = findRentalOrThrow(rentals, id);
    if (
      updatedFields.bookId &&
      updatedFields.bookId !== rentalToBeUpdated.bookId
    ) {
      let updatedBooks = updateBookAvailableCopies(
        rentalToBeUpdated.bookId,
        "increase",
      );
      updatedBooks = updateBookAvailableCopies(
        updatedFields.bookId,
        "reduce",
        updatedBooks,
      );
      writeStorage(BOOK_STORAGE_KEY, updatedBooks);
    }
    writeStorage(
      RENTALS_STORAGE_KEY,
      updateRecordOperation(rentals, id, updatedFields),
    );
    return messages.updateSuccess;
  } catch (error) {
    rethrowBusinessError(error, messages.updateError);
  }
}

async function remove(id: string) {
  try {
    await delay();
    const rentals = readStorage(RENTALS_STORAGE_KEY);
    const rentalToDelete = findRentalOrThrow(rentals, id);
    writeStorage(
      BOOK_STORAGE_KEY,
      updateBookAvailableCopies(rentalToDelete.bookId, "increase"),
    );
    writeStorage(RENTALS_STORAGE_KEY, deleteRecord(rentals, id));
    return messages.deleteSuccess;
  } catch (error) {
    rethrowBusinessError(error, messages.deleteError);
  }
}

async function returnRental(id: string, returnedDate: string) {
  try {
    await delay();
    const rentals = readStorage(RENTALS_STORAGE_KEY);
    const rentalToBeReturned = findRentalOrThrow(rentals, id);
    if (rentalToBeReturned.returnedDate !== null) {
      throw new CustomError("Rental has already been returned");
    }
    if (returnedDate < rentalToBeReturned.rentedDate) {
      throw new CustomError("Returned date cannot be earlier than rented date");
    }
    writeStorage(
      BOOK_STORAGE_KEY,
      updateBookAvailableCopies(rentalToBeReturned.bookId, "increase"),
    );
    writeStorage(
      RENTALS_STORAGE_KEY,
      updateRecordOperation(rentals, id, { returnedDate }),
    );
    return messages.updateSuccess;
  } catch (error) {
    rethrowBusinessError(
      error,
      `Unexpected error occurred while returning rental with id ${id}`,
    );
  }
}

async function undoReturn(id: string) {
  try {
    await delay();
    const rentals = readStorage(RENTALS_STORAGE_KEY);
    const rentalToBeUndone = findRentalOrThrow(rentals, id);
    if (rentalToBeUndone.returnedDate === null) {
      throw new CustomError("Rental has not been returned");
    }
    writeStorage(
      BOOK_STORAGE_KEY,
      updateBookAvailableCopies(rentalToBeUndone.bookId, "reduce"),
    );
    writeStorage(
      RENTALS_STORAGE_KEY,
      updateRecordOperation(rentals, id, { returnedDate: null }),
    );
    return messages.updateSuccess;
  } catch (error) {
    rethrowBusinessError(
      error,
      `Unexpected error occurred while undoing return of rental with id ${id}`,
    );
  }
}

function findRentalOrThrow(rentals: Rental[], id: string) {
  const rental = rentals.find((record) => record.id === id);
  if (!rental) throw new CustomError(messages.notFound);
  return rental;
}

function updateBookAvailableCopies(
  bookId: string,
  operation: "increase" | "reduce",
  books?: Book[],
) {
  books = books || readStorage(BOOK_STORAGE_KEY);
  const bookToBeUpdated = books.find((book) => book.id === bookId);
  if (!bookToBeUpdated)
    throw new CustomError(`Book with id ${bookId} not found`);

  let updatedAvailableCopies = bookToBeUpdated.availableCopies;
  if (
    bookToBeUpdated.availableCopies < bookToBeUpdated.totalCopies &&
    operation === "increase"
  )
    updatedAvailableCopies = bookToBeUpdated.availableCopies + 1;
  else if (operation === "reduce" && bookToBeUpdated.availableCopies > 0)
    updatedAvailableCopies = bookToBeUpdated.availableCopies - 1;
  else {
    throw new CustomError(
      `Cannot ${operation} available copies for '${bookToBeUpdated.title || "Unknown Book"}' `,
    );
  }

  return updateRecordOperation(books, bookId, {
    availableCopies: updatedAvailableCopies,
  });
}
