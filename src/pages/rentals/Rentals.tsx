import { useState } from "react";
import RentalTable from "./RentalTable";
import MyButton from "../../components/MyButton";
import RentalForm from "./modals/RentalForm";
import MyModal from "../../components/MyModal";

export default function Rentals() {
  const [newRentalOpen, setNewRentalOpen] = useState(false);

  return (
    <div>
      <div className="mb-4">
        <MyButton
          title="New Rental"
          onClick={() => {
            setNewRentalOpen(true);
          }}
        />
      </div>
      <RentalTable />
      {newRentalOpen && (
        <MyModal
          onClose={() => {
            setNewRentalOpen(false);
          }}
        >
          <RentalForm onClose={() => setNewRentalOpen(false)} />
        </MyModal>
      )}
    </div>
  );
}
