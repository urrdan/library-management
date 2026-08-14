import { readStorage } from "../utils/storage-operations";
import { endpoints, messages } from "../utils/constants";
import { delay } from "../utils/delay";
import enrichRentals from "../utils/rental-view";

import type { Book } from "src/pages/books/bookTypes";
import type { Customer } from "src/types/customerTypes";
import type { Rental, RentalView } from "src/types/rentalTypes";
import type {
  DashboardData,
  DashboardKPIs,
  RentalChartPoint,
} from "src/types/dashboardTypes";
import { lowBookStockThreshold } from "src/utils/constants";

const BOOK_STORAGE_KEY = endpoints.books;
const RENTAL_STORAGE_KEY = endpoints.rentals;
const CUSTOMER_STORAGE_KEY = endpoints.customers;

const recordLimit = 4;
export async function getDashboardController(): Promise<DashboardData> {
  try {
    await delay();

    const books = readStorage(BOOK_STORAGE_KEY);
    const rentals = readStorage(RENTAL_STORAGE_KEY);
    const customers = readStorage(CUSTOMER_STORAGE_KEY);

    const rentalViews = enrichRentals(rentals);

    return {
      kpis: buildKPIs(books, rentals, customers),
      runningLowBooks: buildRunningLowBooks(books),
      recentRentals: buildRecentRentals(rentalViews),
      overdueRentals: buildOverdueRentals(rentalViews),
    };
  } catch {
    throw new Error(messages.getError);
  }
}

export async function getRentalChartController(): Promise<RentalChartPoint[]> {
  try {
    await delay();

    const rentals = readStorage(RENTAL_STORAGE_KEY);

    return buildRentalChart(rentals);
  } catch {
    throw new Error(messages.getError);
  }
}

/* ---------------------------------------------------------- */
//Private Helpers

function buildKPIs(
  books: Book[],
  rentals: Rental[],
  customers: Customer[],
): DashboardKPIs {
  return {
    totalBooks: books.length,
    totalCustomers: customers.length,
    activeRentals: rentals.filter((r) => !r.returnedDate).length,
    overdueRentals: rentals.filter(
      (r) => !r.returnedDate && new Date(r.dueDate) < new Date(),
    ).length,
  };
}

function buildRunningLowBooks(books: Book[]): Book[] {
  return books
    .filter((book) => book.availableCopies <= lowBookStockThreshold)
    .sort((a, b) => a.availableCopies - b.availableCopies)
    .slice(0, recordLimit);
}

function buildRecentRentals(rentals: RentalView[]): RentalView[] {
  return [...rentals]
    .sort(
      (a, b) =>
        new Date(b.rentedDate).getTime() - new Date(a.rentedDate).getTime(),
    )
    .slice(0, recordLimit);
}

function buildOverdueRentals(rentals: RentalView[]): RentalView[] {
  return rentals
    .filter((r) => !r.returnedDate && new Date(r.dueDate) < new Date())
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, recordLimit);
}

function buildRentalChart(rentals: Rental[]): RentalChartPoint[] {
  const today = new Date();

  const rentalsByDate = new Map<string, { label: string; rentals: number }>();

  // Initialize all seven dates with their Map
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const label = date.toLocaleDateString("en-US", {
      weekday: "short",
    });
    const dateString = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");

    rentalsByDate.set(dateString, { label: label, rentals: 0 });
  }

  for (const rental of rentals) {
    const day = rentalsByDate.get(rental.rentedDate);
    if (day) {
      rentalsByDate.set(rental.rentedDate, {
        ...day,
        rentals: day.rentals + 1,
      });
    }
  }
  return [...rentalsByDate.values()];
}
