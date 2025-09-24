import { Route, Routes } from "react-router-dom";
import Overview from "../pages/Overview.tsx/Overview";
import Books from "../pages/books/Books";
import Rentals from "../pages/rentals/Rentals";
import Customers from "../pages/customers/Customers";

export default function MainDisplay() {
  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/books" element={<Books />} />
      <Route path="/rentals" element={<Rentals />} />
      <Route path="/customers" element={<Customers />} />
    </Routes>
  );
}
