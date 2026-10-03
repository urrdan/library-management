import type { Rental, SeedRental } from "src/types/rentalTypes";
import { toLocalISODate } from "src/utils/dateUtil";

function resolveDayOffset(dayOffset: number): string {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + dayOffset);
  return toLocalISODate(date);
}

export function resolveSeedRentalDates(rentals: SeedRental[]): Rental[] {
  return rentals.map((rental) => ({
    ...rental,
    rentedDate: resolveDayOffset(rental.rentedDate),

    dueDate: resolveDayOffset(rental.dueDate),

    returnedDate:
      rental.returnedDate === null
        ? null
        : resolveDayOffset(rental.returnedDate),
  }));
}
