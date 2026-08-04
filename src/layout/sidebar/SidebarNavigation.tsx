import { NavLink, useLocation } from "react-router-dom";

export default function SidebarNavigation() {
  const activePath = useLocation().pathname;
  const data = [
    { label: "Dashboard", path: "/" },
    { label: "Rentals", path: "/rentals" },
    { label: "Books", path: "/books" },
    { label: "Customers", path: "/customers" },
    { label: "Staff", path: "/staff" },
  ];
  return (
    <div className=" sidebar-navs-wrapper">
      {data.map((nav, index) => (
        <NavLink
          to={nav.path}
          key={index}
          className={`sidebar-nav ${activePath === nav.path && "active-nav"}`}
        >
          {nav.label}
        </NavLink>
      ))}
    </div>
  );
}
