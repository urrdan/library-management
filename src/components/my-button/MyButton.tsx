import type { JSX } from "react";
import "./MyButton.sass";

type props = {
  title?: string;
  icon?: JSX.Element;
  sm?: boolean;
  link?: boolean;
  iconRight?: boolean;
  className?: string;
  onClick?: () => void;
};
export default function ({
  onClick,
  title,
  icon,
  sm,
  link,
  iconRight,
  className,
}: props) {
  return (
    <button
      onClick={onClick}
      className={`${className} my-button ${sm && "sm"} ${link && "link"}     `}
    >
      {icon && !iconRight && <div className="my-button-icon">{icon}</div>}
      {title && <span className="my-button-title">{title}</span>}
      {icon && iconRight && (
        <div className="my-button-icon icon-right">{icon}</div>
      )}
    </button>
  );
}
