import type { Rental, RentalStatus } from "src/types/rentalTypes";
import dateUtil from "src/utils/dateUtil";

export default function getRentalStatus(rental: Rental): RentalStatus {
  if (rental.returnedDate) return "returned";
  if (dateUtil.today() > rental.dueDate) return "overdue";
  return "active";
}
