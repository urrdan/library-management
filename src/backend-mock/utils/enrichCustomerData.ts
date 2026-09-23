import type { Customer } from "src/types/customerTypes";
import { endpoints } from "./constants";
import { readStorage } from "./storage-operations";

export default function enrichCustomersData(customers: Customer[]) {
  const rentals = readStorage(endpoints.rentals);

  const activeRentalMap: Record<string, number> = {};

  rentals.forEach((rental) => {
    if (rental.returnedDate !== null) return;

    activeRentalMap[rental.customerId] =
      (activeRentalMap[rental.customerId] ?? 0) + 1;
  });

  return customers.map((customer) => ({
    ...customer,
    activeRental: activeRentalMap[customer.id] ?? 0,
  }));
}
