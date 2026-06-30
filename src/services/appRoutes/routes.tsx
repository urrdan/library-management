import Overview from "src/pages/Overview.tsx/Overview";
import Books from "src/pages/books/Books";
import Customers from "src/pages/customers/Customers";
import Staff from "src/pages/staff/Staff";
import Rentals from "src/pages/rentals/Rentals";

export const ROUTES = {
  dashboard: {
    path: "/dashboard",
    title: "Dashboard",
    element: <Overview />,
  },

  books: {
    path: "/books",
    title: "Books",
    element: <Books />,
  },

  rentals: {
    path: "/rentals",
    title: "Rentals",
    element: <Rentals />,
  },

  customers: {
    path: "/customers",
    title: "Customers",
    element: <Customers />,
  },

  staff: {
    path: "/staff",
    title: "Staff",
    element: <Staff />,
  },
};
