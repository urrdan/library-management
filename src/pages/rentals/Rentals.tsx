import { useContext, useState } from "react";
import RentalTable from "./RentalTable";
import MyButton from "../../components/MyButton";
import RentalForm from "./modals/RentalForm";
import MyModal from "../../components/MyModal";
import { mainContext } from "../MainContext";
import {
  rentalDataTemplate,
  type rentalDataType,
} from "../../apis/data/rentalData";
import { IoMdAdd } from "react-icons/io";
import ConfirmationModal from "../../components/ConfirmationModal";

export default function Rentals() {
  const { rentals, apis } = useContext(mainContext);
  const [openDelete, setOpenDelete] = useState(false);
  const [RecordToBeDeleted, setRecordToBeDeleted] =
    useState<null | rentalDataType>(null);

  const [openNewRental, setOpenNewRental] = useState(false);
  const [openEditRental, setOpenEditRental] = useState(false);
  const [editingData, setEditingData] =
    useState<rentalDataType>(rentalDataTemplate);

  return (
    <div>
      <div className="mb-4 flex justify-between ">
        <div></div>
        <MyButton
          icon={<IoMdAdd />}
          title="New Rental"
          onClick={() => {
            setOpenNewRental(true);
          }}
        />
      </div>
      <RentalTable
        rentals={rentals}
        onEditing={(record) => {
          setEditingData(record);
          setOpenEditRental(true);
        }}
        onDelete={(record) => {
          setRecordToBeDeleted(record);
          setOpenDelete(true);
        }}
      />
      {openNewRental && (
        <MyModal
          onClose={() => {
            setOpenNewRental(false);
          }}
        >
          <RentalForm
            onClose={() => setOpenNewRental(false)}
            data={rentalDataTemplate}
          />
        </MyModal>
      )}
      {openEditRental && (
        <MyModal
          onClose={() => {
            setOpenEditRental(false);
          }}
        >
          <RentalForm
            onClose={() => {
              setOpenEditRental(false);
              setEditingData(rentalDataTemplate);
            }}
            data={editingData}
            isEditing
          />
        </MyModal>
      )}
      {openDelete && (
        <ConfirmationModal
          onClose={() => setOpenDelete(false)}
          onConfirm={() => {
            apis("rental", "delete", RecordToBeDeleted);
            setRecordToBeDeleted(null);
            setOpenDelete(false);
          }}
          content="Are you sure you want to delete this record?"
        />
      )}
    </div>
  );
}
