import { useState } from "react";
import MySearchInput from "./MySearchInput";
import {
  customersData,
  type customerDataType,
} from "../../apis/data/CustomersData";

export default function CustomerSearcher({
  value,
  onSelect,
  label = "Customer",
}: {
  value: string;
  onSelect: (selectedCustomer: customerDataType) => void;
  label?: string;
}) {
  const [searchResult, setSearchResult] = useState<customerDataType[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let filteredResult: customerDataType[] = [];
    if (value)
      filteredResult = customersData.filter((x) =>
        x.customerName.toLocaleLowerCase().includes(value)
      );

    setSearchResult(filteredResult);
  };

  const resultStructure = () => {
    return (
      <>
        {searchResult.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              onSelect(item);
            }}
            className="px-2 my-2 link-like"
          >
            {item.customerName}
          </div>
        ))}
      </>
    );
  };
  return (
    <MySearchInput
      label={label}
      onChange={onChange}
      resultStructure={resultStructure}
      value={value}
    />
  );
}
