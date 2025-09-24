import { NavLink } from "react-router-dom";

export default function SidebarNavigation() {
  const data = [
    { label: "Overview", path: "/" },
    { label: "Rentals", path: "/rentals" },
    { label: "Books", path: "/books" },
    { label: "Customers", path: "/customers" },
    { label: "Staff", path: "/" },
  ];
  return (
    <div className="grow-1 my-4 ">
      {data.map((nav, index) => (
        <NavLink
          to={nav.path}
          key={index}
          className="my-2 p-2 rounded-lg hover:bg-gray-700 hover:cursor-pointer block"
        >
          {nav.label}
        </NavLink>
      ))}
    </div>
  );
}
