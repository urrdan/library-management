import type { Staff } from "src/types/staffTypes";

export default [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "Johndoe@gmail.com",
    phone: "6231234456",
    staffSince: "2025-10-14",
    role: "admin",
  },
] satisfies Staff[];
