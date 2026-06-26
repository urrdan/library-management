import type { JSX } from "react";
import "./MyButton.sass";

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
      className={`link-like  ${sm && "sm"}   ${className} my-button`}
    >
      <div className="my-button-icon">{icon && icon}</div>
      <span className="my-button-title">{title && title}</span>
    </button>
  );
}
