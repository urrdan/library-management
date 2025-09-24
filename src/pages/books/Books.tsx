import { useState } from "react";
import MyModal from "../../components/MyModal";
import { CgCloseO } from "react-icons/cg";
import MyInput from "../../components/MyInput";
import MyButton from "../../components/MyButton";
import BooksTable from "./BooksTable";

export default function Books() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div style={{ height: 300, width: "100%" }}>
      <BooksTable />
      {openModal && (
        <MyModal
          onClose={() => {
            setOpenModal(false);
          }}
        >
          <div className="flex justify-between">
            <div>New Form</div>{" "}
            <CgCloseO
              onClick={() => {
                setOpenModal(false);
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MyInput type={"number"} label="First Name" />
            <MyInput type={"number"} label="First Name" />
            <MyInput type={"number"} label="First Name" />
            <MyInput type={"number"} label="First Name" />
          </div>
          <div className="m-4">
            <MyButton title={"click"} />
          </div>
        </MyModal>
      )}
    </div>
  );
}
