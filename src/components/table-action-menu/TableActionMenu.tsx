// src/components/table-action-menu/TableActionMenu.tsx

import { useEffect, useRef, useState, type ReactNode } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";

import "./TableActionMenu.sass";

type MenuItem =
  | {
      label: string;
      icon?: ReactNode;
      onClick: () => void;
    }
  | false;

type Props = {
  items: MenuItem[];
};

export default function TableActionMenu({ items }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredItems = items.filter((item) => item !== false);

  return (
    <div ref={menuRef} className="table-action-menu">
      <IoEllipsisVerticalSharp
        className="link-like"
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <div className="table-action-menu__dropdown">
          {filteredItems.map((item, index) => (
            <button
              key={index}
              className="table-action-menu__item link-like"
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
            >
              {item.icon && (
                <span className="table-action-menu__icon">{item.icon}</span>
              )}

              <span className="table-action-menu__label">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
