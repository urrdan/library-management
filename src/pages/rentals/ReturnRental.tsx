import { useState } from "react";
import { MdClose } from "react-icons/md";
import { returnRentalAPI } from "src/api/rentalApi";
import apiWithToast from "src/api/toastifiedApi";
import MyButton from "src/components/my-button/MyButton";
import MyInput from "src/components/my-input/MyInput";
import { MyModalBody, MyModalHead } from "src/components/my-modal/MyModal";

export default function ReturnRental({
  rentalId,
  getRentals,
  onClose,
}: {
  rentalId: string;
  getRentals: () => void;
  onClose: () => void;
}) {
  const [returnedDate, setReturnedDate] = useState<string>("");
  const [error, setError] = useState(false);

  const onReturn = () => {
    if (!returnedDate) {
      setError(true);
      return;
    }
    apiWithToast(returnRentalAPI(rentalId, returnedDate)).then(() => {
      getRentals();
      onClose();
    });
  };
  return (
    <>
      <MyModalHead>
        <div>
          <h4> Return Rental</h4>
        </div>
        <div className="flex">
          <MyButton title="Save" onClick={onReturn} />
          <MdClose
            className="ml-2 link-like text-3xl text-gray-500"
            onClick={onClose}
          />
        </div>
      </MyModalHead>
      <MyModalBody>
        <MyInput
          label="Returned Date"
          type="date"
          value={returnedDate}
          onChange={(value) => setReturnedDate(value)}
          error={error}
        />
      </MyModalBody>
    </>
  );
}
