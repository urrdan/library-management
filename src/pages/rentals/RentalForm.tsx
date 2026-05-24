import { MdClose } from "react-icons/md";
import { useState } from "react";
import formValidation from "src/utils/formValidation";
import apiWithToast from "src/api/toastifiedApi";
import { postApi, updateApi } from "src/api/mockAPI";
import type { Rental } from "src/types/types";
import MyButton from "src/components/MyButton";
import BookSearcher from "src/components/searchers/BookSearcher";
import { MyModalBody, MyModalHead } from "src/components/MyModal";
import CustomerSearcher from "src/components/searchers/CustomersSearcher";
import StaffSearcher from "src/components/searchers/StaffSearcher";
import MyInput from "src/components/MyInput";

type CreatingProp = {
  isEditing: false;
  editingRecord?: never;
};
type EditingProp = {
  isEditing: true;
  editingRecord: Rental;
};

export default function RentalForm({
  editingRecord,
  isEditing,
  onClose,
  getRentals,
}: {
  onClose: () => void;
  getRentals: () => void;
} & (CreatingProp | EditingProp)) {
  const rentalDataTemplate = {
    id: "",
    bookId: "",
    bookTitle: "",
    customerId: "",
    customerName: "",
    staffId: "",
    staffName: "",
    rentedDate: "",
    returnDate: "",
  };
  const fieldsToBeValidated: (keyof Rental)[] = [
    "bookTitle",
    "customerName",
    "staffName",
    "rentedDate",
    "returnDate",
  ];
  const [stateData, setStateData] = useState<Rental>(
    isEditing ? editingRecord : rentalDataTemplate,
  );
  const [errorData, setErrorData] = useState<
    Partial<Record<keyof Rental, boolean>>
  >({});

  const onChange = <K extends keyof Rental>(propName: K, value: Rental[K]) => {
    setStateData((prev) => ({ ...prev, [propName]: value }));
    setErrorData((prev) => {
      if (prev[propName] === true) return { ...prev, [propName]: true };
      return prev;
    });
  };

  const onSave = () => {
    const { hasError, errorObj } = formValidation(
      stateData,
      fieldsToBeValidated,
    );
    setErrorData(errorObj);
    console.log(stateData);
    if (hasError) return;

    const apiPromise = isEditing
      ? apiWithToast(updateApi("/rentals", editingRecord.id, stateData))
      : apiWithToast(postApi("/rentals", stateData));

    apiPromise
      .then(() => {
        getRentals();
        onClose();
      })
      .catch((err) => err);
  };

  return (
    <>
      <MyModalHead>
        <div>
          <h4>{isEditing ? "Edit Rental Info" : "Create New Rental"}</h4>
        </div>
        <div className="flex">
          <MyButton title="Save" onClick={onSave} />
          <MdClose
            className="ml-2 link-like text-3xl text-gray-500"
            onClick={onClose}
          />
        </div>
      </MyModalHead>

      <MyModalBody>
        <div className="grid grid-cols-2 gap-4 gap-x-6">
          <BookSearcher
            value={stateData.bookTitle}
            onSelect={(selectedBook) => {
              onChange("bookTitle", selectedBook.title);
              onChange("bookId", selectedBook.id);
            }}
            error={errorData.bookTitle}
          />
          <CustomerSearcher
            value={stateData.customerName}
            onSelect={(selectedCustomer) => {
              onChange("customerName", selectedCustomer.customerName);
              onChange("customerId", selectedCustomer.customerId);
            }}
            error={errorData.customerName}
          />

          <StaffSearcher
            value={stateData.staffName}
            onSelect={(selectedStaff) => {
              onChange("staffName", selectedStaff.staffName);
              onChange("staffId", selectedStaff.staffId);
            }}
            error={errorData.staffName}
          />

          <MyInput
            label="Rented Date"
            type="date"
            value={stateData.rentedDate}
            onChange={(value) => onChange("rentedDate", value)}
            error={errorData.rentedDate}
          />

          <MyInput
            label="Return Date"
            type="date"
            value={stateData.returnDate}
            onChange={(value) => onChange("returnDate", value)}
            error={errorData.returnDate}
          />
        </div>
      </MyModalBody>
    </>
  );
}
