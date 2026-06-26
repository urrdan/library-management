import type { JSX } from "react/jsx-runtime";
import "./MyModal.sass";

type Props = {
  children: string | JSX.Element | JSX.Element[] /* | (() => JSX.Element) */;
  onClose: () => void;
};

export default function MyModal({ children, onClose }: Props) {
  return (
    <div className=" my-modal" onClick={onClose}>
      <div
        className="my-modal-content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function MyModalHead({
  children,
}: {
  children: JSX.Element | JSX.Element[] | string;
}) {
  return <div className="my-modal-head">{children}</div>;
}

export function MyModalBody({
  children,
}: {
  children: JSX.Element | JSX.Element[] | string;
}) {
  return <div className="p-5 pb-15 my-modal-body">{children}</div>;
}
