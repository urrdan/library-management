import { MdClose } from "react-icons/md";
import { useState } from "react";
import formValidation from "src/utils/formValidation";
import apiWithToast from "src/api/toastifiedApi";
import MyButton from "src/components/my-button/MyButton";
import BookSearcher from "src/components/searchers/BookSearcher";
import { MyModalBody, MyModalHead } from "src/components/my-modal/MyModal";
import CustomerSearcher from "src/components/searchers/CustomersSearcher";
import StaffSearcher from "src/components/searchers/StaffSearcher";
import MyInput from "src/components/my-input/MyInput";
import { createRentalAPI, updateRentalAPI } from "src/api/rentalApi";
import type { RentalCreate, RentalView } from "src/types/rentalTypes";
import { nameJoiner } from "src/utils/fullNameFormatter";

type CreatingProp = {
  isEditing: false;
  editingRecord?: never;
  rentalId?: never;
  isViewing?: never;
};
type EditingProp = {
  isEditing: true;
  editingRecord: RentalView;
  rentalId: string;
  isViewing?: never;
};
type ViewProps = {
  isViewing: true;
  editingRecord: RentalView;
  isEditing?: never;
  rentalId?: never;
};

type EditableRentalView = Omit<RentalView, "id" | "status">;

const rentalDataTemplate: EditableRentalView = {
  bookId: "",
  bookTitle: "",
  customerId: "",
  customerName: "",
  staffId: "",
  staffName: "",
  rentedDate: "",
  dueDate: "",
  returnedDate: null,
};

export default function RentalForm({
  editingRecord,
  isEditing,
  isViewing,
  rentalId,
  onClose,
  getRentals,
}: {
  onClose: () => void;
  getRentals: () => void;
} & (CreatingProp | EditingProp | ViewProps)) {
  const fieldsToBeValidated: (keyof RentalCreate)[] = [
    "bookId",
    "customerId",
    "staffId",
    "rentedDate",
    "dueDate",
  ];

  const [rentalData, setRentalData] = useState<EditableRentalView>(
    editingRecord || rentalDataTemplate,
  );
  const [errorData, setErrorData] = useState<
    Partial<Record<keyof EditableRentalView, boolean>>
  >({});

  const onChange = <K extends keyof EditableRentalView>(
    propName: K,
    value: EditableRentalView[K],
  ) => {
    setRentalData((prev) => ({ ...prev, [propName]: value }));
    setErrorData((prev) => {
      if (prev[propName] === true) return { ...prev, [propName]: false };
      return prev;
    });
  };

  const onSave = () => {
    const { hasError, errorObj } = formValidation(
      rentalData,
      fieldsToBeValidated,
    );
    setErrorData(errorObj);
    console.log(rentalData);
    if (hasError) return;

    const { customerName, staffName, bookTitle, ...adminEditRental } =
      rentalData;
    const { returnedDate, ...creatableRental } = adminEditRental;

    const apiPromise = isEditing
      ? apiWithToast(updateRentalAPI(adminEditRental, rentalId))
      : apiWithToast(createRentalAPI(creatableRental));

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
          <h4>
            {isEditing
              ? "Edit Rental Info"
              : isViewing
                ? "View Rental Info"
                : "Create New Rental"}
          </h4>
        </div>
        <div className="flex">
          {!isViewing && <MyButton title="Save" onClick={onSave} />}
          <MdClose
            className="ml-2 link-like text-3xl text-gray-500"
            onClick={onClose}
          />
        </div>
      </MyModalHead>

      <MyModalBody>
        <div className="grid grid-cols-2 gap-4 gap-x-6">
          <BookSearcher
            value={rentalData.bookTitle}
            onSelect={(selectedBook) => {
              onChange("bookTitle", selectedBook.title);
              onChange("bookId", selectedBook.id);
            }}
            error={errorData.bookId}
            disabled={isViewing}
          />
          <CustomerSearcher
            value={rentalData.customerName}
            onSelect={(selectedCustomer) => {
              const name = nameJoiner(selectedCustomer);
              onChange("customerName", name);
              onChange("customerId", selectedCustomer.id);
            }}
            error={errorData.customerId}
            disabled={isViewing}
          />

          <StaffSearcher
            value={rentalData.staffName}
            onSelect={(selectedStaff) => {
              onChange("staffName", nameJoiner(selectedStaff));
              onChange("staffId", selectedStaff.id);
            }}
            error={errorData.staffId}
            disabled={isViewing}
          />

          <MyInput
            label="Rented Date"
            type="date"
            value={rentalData.rentedDate}
            onChange={(value) => onChange("rentedDate", value)}
            error={errorData.rentedDate}
            disabled={isViewing}
          />

          <MyInput
            label="Due Date"
            type="date"
            value={rentalData.dueDate}
            onChange={(value) => onChange("dueDate", value)}
            error={errorData.dueDate}
            disabled={isViewing}
          />
          {isViewing && editingRecord.returnedDate && (
            <MyInput
              label="Returned Date"
              type="date"
              value={editingRecord.returnedDate || ""}
              onChange={() => {}}
              disabled
            />
          )}
        </div>
      </MyModalBody>
    </>
  );
}
