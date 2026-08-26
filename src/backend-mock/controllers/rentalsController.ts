import {
  createRecordOperation,
  updateRecordOperation,
} from "../utils/records-operations";
import { readStorage, writeStorage } from "../utils/storage-operations";
import { endpoints, messages } from "../utils/constants";
import { delay } from "../utils/delay";
import { CustomError } from "../utils/error";
import type {
  AdminRentalEditable,
  RentalCreate,
  RentalStatusFilter,
} from "src/types/rentalTypes";
import type { Book } from "src/pages/books/bookTypes";
import enrichRentals from "../utils/rental-view";
import getRentalStatus from "../utils/get-rental-status";

const RENTALS_STORAGE_KEY = endpoints.rentals;
const BOOK_STORAGE_KEY = endpoints.books;
export async function getEnhancedRentalsController({
  page = 1,
  pageSize = 10,
  status = "all",
}: {
  page?: number;
  pageSize?: number;
  status?: RentalStatusFilter;
}) {
  try {
    await delay();
    const rentals = readStorage(RENTALS_STORAGE_KEY);

    // filter
    let filteredRentals = rentals; //let filteredRentals:Rental[] = [];

    if (status === "all") filteredRentals = rentals;
    else {
      filteredRentals = rentals.filter(
        (rental) => getRentalStatus(rental) === status,
      );
    }

    // sort
    filteredRentals.sort(
      (a, b) =>
        new Date(b.rentedDate).getTime() - new Date(a.rentedDate).getTime(),
    );

    // pagination metadata
    const totalRecords = filteredRentals.length;
    const totalPages = Math.ceil(totalRecords / pageSize);

    const startIndex = (page - 1) * pageSize;

    const paginatedRentals = filteredRentals.slice(
      startIndex,
      startIndex + pageSize,
    );

    // enrich only records that will actually be returned
    const data = enrichRentals(paginatedRentals);

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

export async function getRentalsController() {
  try {
    await delay();
    const rentals = readStorage(RENTALS_STORAGE_KEY);
    return rentals;
  } catch {
    throw new Error(messages.getError);
  }
}

export async function getCustomerRentalsController(customerId: string) {
  try {
    await delay();
    const rentals = readStorage(RENTALS_STORAGE_KEY);
    const customerRentals = rentals.filter(
      (rental) => rental.customerId === customerId,
    );
    const enrichedRentals = enrichRentals(customerRentals);
    return enrichedRentals;
  } catch {
    throw new Error(messages.getError);
  }
}

export async function createRentalController(
  newRental: RentalCreate,
): Promise<string> {
  try {
    await delay();
    const rentals = readStorage(RENTALS_STORAGE_KEY);
    const defaultRental = { returnedDate: null }; //uneditable system fields
    const updatedRentals = createRecordOperation(rentals, {
      ...defaultRental,
      ...newRental,
    });
    const updateBooks = updateBookAvailableCopies(newRental.bookId, "reduce");

    writeStorage(BOOK_STORAGE_KEY, updateBooks);
    writeStorage(RENTALS_STORAGE_KEY, updatedRentals);
    return messages.postSuccess;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error; // business error
    }
    throw new Error(messages.postError); //unexpected
  }
}

export async function updateRentalController(
  id: string,
  updatedFields: AdminRentalEditable,
): Promise<string> {
  try {
    await delay();
    const rentals = readStorage(RENTALS_STORAGE_KEY);
    const rentalToBeUpdated = rentals.find((rental) => rental.id === id);
    if (!rentalToBeUpdated) {
      throw new CustomError(messages.notFound);
    }
    if (updatedFields.bookId !== rentalToBeUpdated.bookId) {
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

    const updatedRentals = updateRecordOperation(rentals, id, updatedFields);
    writeStorage(RENTALS_STORAGE_KEY, updatedRentals);
    return messages.updateSuccess;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error; // business error
    }
    throw new Error(messages.updateError); //unexpected
  }
}

export async function deleteRentalController(id: string) {
  try {
    await delay();
    const rentals = readStorage(RENTALS_STORAGE_KEY);
    const rentalToDelete = rentals.find((rental) => rental.id === id);
    if (!rentalToDelete) throw new CustomError(messages.notFound);
    const updatedRentals = rentals.filter((rental) => rental.id !== id);
    const updatedBooks = updateBookAvailableCopies(
      rentalToDelete.bookId,
      "increase",
    );

    writeStorage(BOOK_STORAGE_KEY, updatedBooks);
    writeStorage(RENTALS_STORAGE_KEY, updatedRentals);
    return messages.deleteSuccess;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error; // business error
    }
    throw new Error(messages.deleteError); //unexpected
  }
}

export async function returnRentalController(id: string, returnedDate: string) {
  try {
    await delay();
    const rentals = readStorage(RENTALS_STORAGE_KEY);
    const rentalToBeReturned = rentals.find((rental) => rental.id === id);
    if (!rentalToBeReturned) {
      throw new CustomError(messages.notFound);
    }
    if (rentalToBeReturned.returnedDate !== null) {
      throw new CustomError("Rental has already been returned");
    }
    if (returnedDate < rentalToBeReturned.rentedDate) {
      throw new CustomError("Returned date cannot be earlier than rented date");
    }

    const updatedBooks = updateBookAvailableCopies(
      rentalToBeReturned.bookId,
      "increase",
    );
    const updatedRentals = updateRecordOperation(rentals, id, {
      returnedDate: returnedDate,
    });
    writeStorage(BOOK_STORAGE_KEY, updatedBooks);
    writeStorage(RENTALS_STORAGE_KEY, updatedRentals);
    return messages.updateSuccess;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error; // business error
    }
    throw new Error(
      `Unexpected error occurred while returning rental with id ${id}`,
    ); //unexpected
  }
}

export async function undoReturnRentalController(id: string) {
  try {
    await delay();
    const rentals = readStorage(RENTALS_STORAGE_KEY);
    const rentalToBeUndone = rentals.find((rental) => rental.id === id);
    if (!rentalToBeUndone) {
      throw new CustomError(messages.notFound);
    }
    if (rentalToBeUndone.returnedDate === null) {
      throw new CustomError("Rental has not been returned");
    }

    const updatedBooks = updateBookAvailableCopies(
      rentalToBeUndone.bookId,
      "reduce",
    );
    const updatedRentals = updateRecordOperation(rentals, id, {
      returnedDate: null,
    });
    writeStorage(BOOK_STORAGE_KEY, updatedBooks);
    writeStorage(RENTALS_STORAGE_KEY, updatedRentals);
    return messages.updateSuccess;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error; // business error
    }
    throw new Error(
      `Unexpected error occurred while undoing return of rental with id ${id}`,
    ); //unexpected
  }
}

function updateBookAvailableCopies(
  bookId: string,
  operation: "increase" | "reduce",
  books?: Book[],
) {
  books = books || readStorage(BOOK_STORAGE_KEY);
  const bookToBeUpdated = books.find((book) => book.id === bookId);
  if (bookToBeUpdated) {
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
      ...bookToBeUpdated,
      availableCopies: updatedAvailableCopies,
    });
  }
  throw new CustomError(`Book with id ${bookId} not found`);
}
