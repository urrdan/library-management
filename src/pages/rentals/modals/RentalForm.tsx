import { MdClose } from "react-icons/md";
import MyButton from "../../../components/MyButton";
import MyInput from "../../../components/MyInput";
import { MyModalBody, MyModalHead } from "../../../components/MyModal";
import MySelectInput from "../../../components/MySelectInput";
import CustomerSearcher from "../../../components/searchers/CustomersSearcher";
import { useState } from "react";
import BookSearcher from "../../../components/searchers/BookSearcher";
import StaffSearcher from "../../../components/searchers/StaffSearcher";

export default function RentalForm({ onClose }: { onClose: () => void }) {
  const [data, setData] = useState<{ [key: string]: any }>({});
  const onChange = (
    dataToBeModified: { value: string | number; propName: string }[]
  ) => {
    let modifiedData: { [key: string]: any } = {};
    dataToBeModified.forEach((c) => {
      modifiedData[c.propName] = c.value;
    });

    console.log(modifiedData);

    setData({ ...data, ...modifiedData });
  };
  return (
    <>
      <MyModalHead>
        <div></div>
        <div className="flex">
          <MyButton
            title="Save"
            onClick={() => {
              console.log(data);
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
            value={data.customerName}
            onSelect={(selectedCustomer) => {
              onChange([
                { propName: "customerName", value: selectedCustomer.name },
                { propName: "customerId", value: selectedCustomer.id },
              ]);
            }}
          />
          <BookSearcher
            value={data.bookTitle}
            onSelect={(selectedBook) => {
              onChange([
                { propName: "bookTitle", value: selectedBook.name },
                { propName: "bookId", value: selectedBook.id },
              ]);
            }}
          />
          <StaffSearcher
            value={data.staffName}
            onSelect={(selectedStaff) => {
              onChange([
                { propName: "staffName", value: selectedStaff.name },
                { propName: "staffId", value: selectedStaff.id },
              ]);
            }}
          />
          <MySelectInput
            label="Genre"
            options={["Crime", "Thriller", "Romance", "Children"]}
            onChange={(value) =>
              onChange([{ value: value, propName: "genre" }])
            }
          />

          <MyInput
            label="Rented Date"
            type="date"
            onChange={(e) => onChange([{ propName: "rentedDate", value: e }])}
          />
          <MyInput
            label="Return Date"
            type="date"
            onChange={(e) => onChange([{ propName: "returnDate", value: e }])}
          />
        </div>
      </MyModalBody>
    </>
  );
}
