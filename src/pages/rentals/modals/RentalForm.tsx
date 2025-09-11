import { MdClose } from "react-icons/md";
import MyButton from "../../../components/MyButton";
import MyInput from "../../../components/MyInput";
import { MyModalBody, MyModalHead } from "../../../components/MyModal";

export default function RentalForm({ onClose }: { onClose: () => void }) {
  return (
    <>
      <MyModalHead>
        <MyButton title="Save" sm />
        <MdClose
          className="link-like text-xl text-gray-500"
          onClick={onClose}
        />
      </MyModalHead>

      <MyModalBody>
        <div className="grid grid-cols-2 gap-1.5">
          <MyInput label="" />
          <MyInput label="" />
          <MyInput label="" />
          <MyInput label="" />
          <MyInput label="" />
          <MyInput label="" />
          <MyInput label="" />
          <MyInput label="" />
          <MyInput label="" />
          <MyInput label="" />
          <MyInput label="" />
          <MyInput label="" />
          <MyInput label="" />
          <MyInput label="" />
          <MyInput label="" />
          <MyInput label="" />
          <MyInput label="" />
          <MyInput label="" />
          <MyInput label="" />
          <MyInput label="" />
          <MyInput label="" />
          <MyInput label="" />
          <MyInput label="" />
          <MyInput label="" />
        </div>
      </MyModalBody>
    </>
  );
}
