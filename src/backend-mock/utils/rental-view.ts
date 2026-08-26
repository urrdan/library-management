import type { Rental, RentalView } from "src/types/rentalTypes";
import { endpoints } from "./constants";
import { readStorage } from "./storage-operations";
import { nameJoiner } from "src/utils/fullNameFormatter";
import getRentalStatus from "./get-rental-status";
export default function enrichRentals(rentals: Rental[]): RentalView[] {
  const books = readStorage(endpoints.books);
  const customers = readStorage(endpoints.customers);
  const staff = readStorage(endpoints.staff);

  //setup lookup maps
  const bookMap = new Map(books.map((book) => [book.id, book]));
  const customerMap = new Map(
    customers.map((customer) => [customer.id, customer]),
  );
  const staffMap = new Map(staff.map((member) => [member.id, member]));

  // prepare enriched data for view page
  const enrichedRentals: RentalView[] = rentals.map((rental) => {
    const customer = customerMap.get(rental.customerId);
    const staffMember = staffMap.get(rental.staffId);

    return {
      ...rental,
      bookTitle: bookMap.get(rental.bookId)?.title ?? "",
      customerName: customer ? nameJoiner(customer) : "",
      staffName: staffMember ? nameJoiner(staffMember) : "",
      status: getRentalStatus(rental),
    };
  });

  return enrichedRentals;
}
