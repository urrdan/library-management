import { Route, Routes } from "react-router-dom";
import Overview from "../pages/Overview.tsx/Overview";
import Books from "../pages/Books";
import Rentals from "../pages/rentals/Rentals";

export default function MainDisplay() {
  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/books" element={<Books />} />
      <Route path="/rentals" element={<Rentals />} />
    </Routes>
  );
}
