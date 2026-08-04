import { useState } from "react";
import { getRentalsAPI } from "src/api/rentalApi";
import MyModal from "src/components/my-modal/MyModal";
import ResourcePage from "src/components/resource-page/ResourcePage";
import { useResource } from "src/hooks/useResource";
import RentalForm from "./RentalForm";
import RentalTable from "./RentalTable";

export default function Rentals() {
  const { data: rentals, loading, refresh } = useResource(getRentalsAPI);
  const [openNewRental, setOpenNewRental] = useState(false);

  return (
    <ResourcePage
      loading={loading}
      newRecordTitle="New Rental"
      onNewRecord={() => setOpenNewRental(true)}
    >
      <RentalTable rentals={rentals} getRentals={refresh} />
      {openNewRental && (
        <MyModal onClose={() => setOpenNewRental(false)}>
          <RentalForm
            isEditing={false}
            onClose={() => setOpenNewRental(false)}
            getRentals={refresh}
          />
        </MyModal>
      )}
    </ResourcePage>
  );
}
