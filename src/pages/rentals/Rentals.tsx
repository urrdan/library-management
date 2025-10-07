import { useState } from "react";
import RentalTable from "./RentalTable";
import MyButton from "../../components/MyButton";
import RentalForm from "./modals/RentalForm";
import MyModal from "../../components/MyModal";
//import { mainContext } from "../MainContext";
import { rentalData as rentals } from "../../apis/data/rentalData";

export default function Rentals() {
  //const { rentals } = useContext(mainContext);
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
      <RentalTable rentals={rentals} />
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
