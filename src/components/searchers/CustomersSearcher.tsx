import { useEffect, useState } from "react";
import MySearchInput from "./MySearchInput";
import { getCustomersAPI } from "src/api/customersApi";
import type { Customer } from "src/types/customerTypes";
import { nameJoiner } from "src/utils/fullNameFormatter";
import { reportError } from "src/utils/errorUtils";

export default function CustomerSearcher({
  value,
  onSelect,
  label = "Customer",
  error,
}: {
  value: string;
  onSelect: (selectedCustomer: Customer) => void;
  label?: string;
  error?: boolean;
}) {
  const [data, setData] = useState<Customer[]>([]);
  const [searchResult, setSearchResult] = useState<Customer[]>([]);
  const getData = () => {
    getCustomersAPI()
      .then((res) => setData(res.data))
      .catch((err: unknown) => reportError("CustomerSearcher.getData", err));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let filteredResult: Customer[] = [];
    if (value)
      filteredResult = data.filter((x) => {
        const name = nameJoiner(x);
        return name.toLocaleLowerCase().includes(value);
      });
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
            {nameJoiner(item)}
          </div>
        ))}
      </>
    );
  };

  useEffect(getData, []);
  return (
    <MySearchInput
      label={label}
      onChange={onChange}
      resultStructure={resultStructure}
      value={value}
      error={error}
    />
  );
}
