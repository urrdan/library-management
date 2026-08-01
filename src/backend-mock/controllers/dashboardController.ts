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
  RentalChartPeriod,
} from "src/types/dashboardTypes";
import { lowBookStockThreshold } from "src/utils/constants";

const BOOK_STORAGE_KEY = endpoints.books;
const RENTAL_STORAGE_KEY = endpoints.rentals;
const CUSTOMER_STORAGE_KEY = endpoints.customers;

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

export async function getRentalChartController(
  period: RentalChartPeriod,
): Promise<RentalChartPoint[]> {
  try {
    await delay();

    const rentals = readStorage(RENTAL_STORAGE_KEY);

    return buildRentalChart(rentals, period);
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
    .slice(0, 5);
}

function buildRecentRentals(rentals: RentalView[]): RentalView[] {
  return [...rentals]
    .sort(
      (a, b) =>
        new Date(b.rentedDate).getTime() - new Date(a.rentedDate).getTime(),
    )
    .slice(0, 5);
}

function buildOverdueRentals(rentals: RentalView[]): RentalView[] {
  return rentals
    .filter((r) => !r.returnedDate && new Date(r.dueDate) < new Date())
    .slice(0, 5);
}

function buildRentalChart(
  rentals: Rental[],
  period: RentalChartPeriod,
): RentalChartPoint[] {
  const today = new Date();

  if (period === "week") {
    const result: RentalChartPoint[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      const label = date.toLocaleDateString("en-US", {
        weekday: "short",
      });

      const rentalsCount = rentals.filter((rental) => {
        const rentedDate = new Date(rental.rentedDate);

        return (
          rentedDate.getFullYear() === date.getFullYear() &&
          rentedDate.getMonth() === date.getMonth() &&
          rentedDate.getDate() === date.getDate()
        );
      }).length;

      result.push({
        label,
        rentals: rentalsCount,
      });
    }

    return result;
  }

  // Last 4 weeks
  const result: RentalChartPoint[] = [];

  for (let i = 3; i >= 0; i--) {
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - i * 7 - 6);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(today);
    weekEnd.setDate(today.getDate() - i * 7);
    weekEnd.setHours(23, 59, 59, 999);

    const rentalsCount = rentals.filter((rental) => {
      const rentedDate = new Date(rental.rentedDate);

      return rentedDate >= weekStart && rentedDate <= weekEnd;
    }).length;

    result.push({
      label: `Week ${4 - i}`,
      rentals: rentalsCount,
    });
  }

  return result;
}
