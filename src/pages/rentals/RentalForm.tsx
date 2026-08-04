import { MdClose } from "react-icons/md";
import { useState } from "react";
import formValidation from "src/utils/formValidation";
import apiWithToast from "src/api/toastifiedApi";
import { createRentalAPI, updateRentalAPI } from "src/api/rentalApi";
import type { Rental, RentalEditable } from "src/types/rentalTypes";
import MyButton from "src/components/my-button/MyButton";
import BookSearcher from "src/components/searchers/BookSearcher";
import { MyModalBody, MyModalHead } from "src/components/my-modal/MyModal";
import CustomerSearcher from "src/components/searchers/CustomersSearcher";
import StaffSearcher from "src/components/searchers/StaffSearcher";
import MyInput from "src/components/my-input/MyInput";
import { nameJoiner } from "src/utils/fullNameFormatter";

const rentalTemplate: RentalEditable = {
  bookId: "",
  bookTitle: "",
  customerId: "",
  customerName: "",
  staffId: "",
  staffName: "",
  rentedDate: "",
  dueDate: "",
};

const fieldsToBeValidated: (keyof RentalEditable)[] = [
  "bookTitle",
  "customerName",
  "staffName",
  "rentedDate",
  "dueDate",
];

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
  const [stateData, setStateData] = useState<RentalEditable>(
    editingRecord || rentalTemplate,
  );
  const [errorData, setErrorData] = useState<
    Partial<Record<keyof RentalEditable, boolean>>
  >({});

  const onChange = (updatedFields: Partial<RentalEditable>) => {
    setStateData((prev) => ({ ...prev, ...updatedFields }));
  };

  const onSave = () => {
    const { hasError, errorObj } = formValidation(
      stateData,
      fieldsToBeValidated,
    );
    setErrorData(errorObj);
    if (hasError) return;

    const apiPromise = isEditing
      ? apiWithToast(updateRentalAPI(stateData, editingRecord.id))
      : apiWithToast(createRentalAPI(stateData));

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
            onSelect={(selectedBook) =>
              onChange({
                bookTitle: selectedBook.title,
                bookId: selectedBook.id,
              })
            }
            error={errorData.bookTitle}
          />
          <CustomerSearcher
            value={stateData.customerName}
            onSelect={(selectedCustomer) =>
              onChange({
                customerName: nameJoiner(selectedCustomer),
                customerId: selectedCustomer.id,
              })
            }
            error={errorData.customerName}
          />

          <StaffSearcher
            value={stateData.staffName}
            onSelect={(selectedStaff) =>
              onChange({
                staffName: nameJoiner(selectedStaff),
                staffId: selectedStaff.id,
              })
            }
            error={errorData.staffName}
          />

          <MyInput
            label="Rented Date"
            type="date"
            value={stateData.rentedDate}
            onChange={(value) => onChange({ rentedDate: value })}
            error={errorData.rentedDate}
          />

          <MyInput
            label="Due Date"
            type="date"
            value={stateData.dueDate}
            onChange={(value) => onChange({ dueDate: value })}
            error={errorData.dueDate}
          />
        </div>
      </MyModalBody>
    </>
  );
}
