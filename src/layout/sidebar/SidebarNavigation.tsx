import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpenCheck,
  BookOpen,
  Users,
  UserCog,
} from "lucide-react";

export default function SidebarNavigation() {
  const data = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Rentals",
      path: "/rentals",
      icon: BookOpenCheck,
    },
    {
      label: "Books",
      path: "/books",
      icon: BookOpen,
    },
    {
      label: "Customers",
      path: "/customers",
      icon: Users,
    },
    {
      label: "Staff",
      path: "/staff",
      icon: UserCog,
    },
  ];

  return (
    <nav className="sidebar-navs-wrapper">
      {data.map((nav) => {
        const Icon = nav.icon;

        return (
          <NavLink
            to={nav.path}
            key={nav.path}
            className={({ isActive }) =>
              `sidebar-nav ${isActive ? "active-nav" : ""}`
            }
            title={nav.label}
          >
            <Icon className="sidebar-nav-icon" size={20} />

            <span className="sidebar-text">{nav.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
