import { NavLink } from "react-router-dom";

export default function SidebarNavigation() {
  const data = [
    { label: "Overview", path: "/" },
    { label: "Dashboard", path: "/" },
    { label: "Compliance", path: "/" },
    { label: "Books", path: "/books" },
    { label: "Staff", path: "/" },
  ];
  return (
    <div className="grow-1 my-4 ">
      {data.map((nav) => (
        <NavLink
          to={nav.path}
          className="my-2 p-2 rounded-lg hover:bg-gray-700 hover:cursor-pointer block"
        >
          {nav.label}
        </NavLink>
      ))}
    </div>
  );
}
