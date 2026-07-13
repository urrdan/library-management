import type { Rental } from "src/types/rentalTypes";

export default [
  {
    id: "11",
    bookId: "4",
    bookTitle: "A Narrow Escapes",
    customerId: "2",
    customerName: "John Doe",
    staffId: "1",
    staffName: "John Doe",
    rentedDate: "2025-09-25",
    dueDate: "2025-09-30",
    returnedDate: null,
  },
  {
    id: "13",
    bookId: "3",
    bookTitle: "The Witch And Twelve Slaves",
    customerId: "2",
    customerName: "Michael Brown",
    staffId: "2",
    staffName: "Michael Brown",
    rentedDate: "2025-09-29",
    dueDate: "2025-10-06",
    returnedDate: "2025-10-14",
  },
] satisfies Rental[];
