import { Route, Routes } from "react-router-dom";
import Overview from "../pages/Overview.tsx/Overview";
import Books from "../pages/Books";

export default function MainDisplay() {
  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/books" element={<Books />} />
    </Routes>
  );
}
