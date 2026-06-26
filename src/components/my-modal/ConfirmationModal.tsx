import MyButton from "../my-button/MyButton";
import MyModal from "./MyModal";

export default function ({
  onClose,
  onConfirm,
  content = "Are you sure you want to delete this record?",
}: {
  onClose: () => void;
  onConfirm: () => void;
  content?: string;
}) {
  return (
    <MyModal onClose={onClose}>
      <div className="p-5">
        <p>{content}</p>
        <div className="mt-4 flex justify-center">
          <MyButton title="Yes " onClick={onConfirm} className="mr-3" />
          <MyButton title="No" onClick={onClose} />
        </div>
      </div>
    </MyModal>
  );
}
