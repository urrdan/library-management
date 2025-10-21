import { MdClose } from "react-icons/md";
import MyButton from "../../../components/MyButton";
import MyInput from "../../../components/MyInput";
import { MyModalBody, MyModalHead } from "../../../components/MyModal";
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
  const [errorData, setErrorData] = useState<any>({});

  const onChange = (
    dataToBeModified: { value: string | number; propName: string }[]
  ) => {
    let modifiedData: { [key: string]: any } = {};
    dataToBeModified.forEach((c) => {
      modifiedData[c.propName] = c.value;
    });
    setErrorData((prev: any) => {
      dataToBeModified.forEach((x) => (prev[x.propName] = false));
      return prev;
    });

    setStateData({ ...stateData, ...modifiedData });
  };

  const validation = (
    l: string[],
    data: any,
    setError: any,
    callback: () => void
  ) => {
    const c: { [key: string]: boolean } = {};
    l.forEach((x) => {
      console.log(data[x]);
      !data[x] && (c[x] = true);
    });
    setError(c);
    Object.values(c).find((x) => x == true) ? () => {} : callback();
  };
  const onSave = () => {
    const method = isEditing ? "update" : "post";
    validation(
      ["bookTitle", "customerName", "staffName", "rentedDate", "returnDate"],
      stateData,
      setErrorData,
      () => {
        apis("rental", method, stateData);
        onClose();
      }
    );
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
              onChange([
                { propName: "bookTitle", value: selectedBook.title },
                { propName: "bookId", value: selectedBook.bookId },
              ]);
            }}
            error={errorData.bookTitle}
          />
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
            error={errorData.customerName}
          />

          <StaffSearcher
            value={stateData.staffName}
            onSelect={(selectedStaff) => {
              onChange([
                { propName: "staffName", value: selectedStaff.staffName },
                { propName: "staffId", value: selectedStaff.staffId },
              ]);
            }}
            error={errorData.staffName}
          />

          <MyInput
            label="Rented Date"
            type="date"
            value={stateData.rentedDate}
            onChange={(e) => onChange([{ propName: "rentedDate", value: e }])}
            error={errorData.rentedDate}
          />

          <MyInput
            label="Return Date"
            type="date"
            value={stateData.returnDate}
            onChange={(e) => onChange([{ propName: "returnDate", value: e }])}
            error={errorData.returnDate}
          />
        </div>
      </MyModalBody>
    </>
  );
}
