import { MdClose } from "react-icons/md";
import MyButton from "../../../components/MyButton";
import MyInput from "../../../components/MyInput";
import { MyModalBody, MyModalHead } from "../../../components/MyModal";
import MySelectInput from "../../../components/MySelectInput";
import CustomerSearcher from "../../../components/searchers/CustomersSearcher";
import { useContext, useState } from "react";
import BookSearcher from "../../../components/searchers/BookSearcher";
import StaffSearcher from "../../../components/searchers/StaffSearcher";
import { mainContext } from "../../MainContext";
import type { rentalDataType } from "../../../apis/data/rentalData";

export default function RentalForm({
  data,
  isEditing,
  onClose,
}: {
  data: rentalDataType;
  isEditing?: boolean;
  onClose: () => void;
}) {
  const { apis } = useContext(mainContext);

  const [stateData, setStateData] = useState<rentalDataType>(data);

  const onChange = (
    dataToBeModified: { value: string | number; propName: string }[]
  ) => {
    let modifiedData: { [key: string]: any } = {};
    dataToBeModified.forEach((c) => {
      modifiedData[c.propName] = c.value;
    });

    setStateData({ ...stateData, ...modifiedData });
  };

  return (
    <>
      <MyModalHead>
        <div>
          <h4>{isEditing ? "Edit Rental Info" : "Create New Rental"}</h4>
        </div>
        <div className="flex">
          <MyButton
            title="Save"
            onClick={() => {
              console.log(stateData);
              const method = isEditing ? "update" : "post";
              apis("rental", method, stateData);
              onClose();
            }}
          />
          <MdClose
            className="ml-2 link-like text-3xl text-gray-500"
            onClick={onClose}
          />
        </div>
      </MyModalHead>

      <MyModalBody>
        <div className="grid grid-cols-2 gap-4 gap-x-6">
          <CustomerSearcher
            value={stateData.customerName}
            onSelect={(selectedCustomer) => {
              onChange([
                {
                  propName: "customerName",
                  value: selectedCustomer.customerName,
                },
                {
                  propName: "customerId",
                  value: selectedCustomer.customerId,
                },
              ]);
            }}
          />

          <BookSearcher
            value={stateData.bookTitle}
            onSelect={(selectedBook) => {
              onChange([
                { propName: "bookTitle", value: selectedBook.title },
                { propName: "bookId", value: selectedBook.bookId },
              ]);
            }}
          />
          <StaffSearcher
            value={stateData.staffName}
            onSelect={(selectedStaff) => {
              onChange([
                { propName: "staffName", value: selectedStaff.staffName },
                { propName: "staffId", value: selectedStaff.staffId },
              ]);
            }}
          />

          <MyInput
            label="Rented Date"
            type="date"
            value={stateData.rentedDate}
            onChange={(e) => onChange([{ propName: "rentedDate", value: e }])}
          />
          <MyInput
            label="Return Date"
            type="date"
            value={stateData.returnDate}
            onChange={(e) => onChange([{ propName: "returnDate", value: e }])}
          />
        </div>
      </MyModalBody>
    </>
  );
}
