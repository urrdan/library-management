import type { JSX } from "react";

type props = {
  title?: string;
  icon?: JSX.Element;
  sm?: boolean;
  className?: string;
  onClick?: () => void;
};
export default function ({ onClick, title, icon, sm, className }: props) {
  return (
    <button
      onClick={onClick}
      className={`link-like px-2.5 py-0.5 ${
        sm && "px-1 py-0.25 text-[0.85rem]"
      } bg-blue-400 rounded-sm text-white ${className}`}
    >
      {icon && icon}
      {title && title}
    </button>
  );
}
