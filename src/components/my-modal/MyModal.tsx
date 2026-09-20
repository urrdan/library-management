import "./MyModal.sass";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClose: () => void;
  size?: {
    width?: string;
    height?: string;
  };
};

export default function MyModal({ children, onClose, size }: Props) {
  return createPortal(
    <div className=" my-modal" onClick={onClose}>
      <div
        className="my-modal-content"
        style={{
          width: size?.width,
          height: size?.height,
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

export function MyModalHead({ children }: { children: ReactNode }) {
  return <div className="my-modal-head">{children}</div>;
}

export function MyModalBody({ children }: { children: ReactNode }) {
  return <div className="p-5 pb-15 my-modal-body">{children}</div>;
}
