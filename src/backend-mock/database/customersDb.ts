import type { Customer } from "src/types/customerTypes";

export default [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "Johndoe@gmail.com",
    phone: "6231234456",
    customerSince: "2025-10-14",
    status: "active",
    activeRental: 0,
  },
] satisfies Customer[];
