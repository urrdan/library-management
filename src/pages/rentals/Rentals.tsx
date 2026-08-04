import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import apiWithToast from "src/api/toastifiedApi";
import { getApi } from "src/api/mockAPI";
import Loading from "src/components/loading/Loading";
import MyModal from "src/components/MyModal";
import MyButton from "src/components/MyButton";
import RentalTable from "./RentalTable";
import RentalForm from "./RentalForm";
import ErrorState from "src/components/error-state/ErrorState";
import { getErrorMessage, reportError } from "src/utils/errorUtils";

export type Rental = {
  id: string;
  bookId: string;
  bookTitle: string;
  customerId: string;
  customerName: string;
  staffId: string;
  staffName: string;
  rentedDate: string;
  returnDate: string;
};

export default function Rentals() {
  const [rentalData, setRentalData] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [openNewRental, setOpenNewRental] = useState(false);

  function getRentals() {
    setLoading(true);
    setLoadError(null);
    apiWithToast(getApi<Rental>("/rentals"))
      .then((res) => setRentalData(res.data))
      .catch((err: unknown) => {
        reportError("getRentals", err);
        setLoadError(getErrorMessage(err));
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getRentals();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : loadError ? (
        <ErrorState message={loadError} onRetry={getRentals} />
      ) : (
        <>
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
          <RentalTable rentals={rentalData} getRentals={getRentals} />
          {openNewRental && (
            <MyModal
              onClose={() => {
                setOpenNewRental(false);
              }}
            >
              <RentalForm
                isEditing={false}
                onClose={() => setOpenNewRental(false)}
                getRentals={getRentals}
              />
            </MyModal>
          )}
        </>
      )}
    </div>
  );
}
