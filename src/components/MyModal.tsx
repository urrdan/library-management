import type { JSX } from "react/jsx-runtime";

type Props = {
  children: string | JSX.Element | JSX.Element[] /* | (() => JSX.Element) */;
  onClose: () => void;
};
export default function MyModal({ children, onClose }: Props) {
  return (
    <div
      className="h-full p-4 w-full absolute top-0 left-0 flex items-center justify-center bg-[#2e2e2e80]"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded max-h-full max-w-full overflow-auto"
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
  return (
    <div className="border-1 p-4 py-1 sticky top-0 bg-white  flex justify-between items-center">
      {children}
    </div>
  );
}

export function MyModalBody({
  children,
}: {
  children: JSX.Element | JSX.Element[] | string;
}) {
  return <div className="p-4">{children}</div>;
}
