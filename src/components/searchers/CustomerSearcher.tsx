import { useState } from "react";
import MySearchInput from "./MySearchInput";
import type { Customer } from "src/types/customerTypes";
import { nameJoiner } from "src/utils/stringUtils";
import { searchCustomersAPI } from "src/api/customersApi";

export default function CustomerSearcher({
  value,
  onSelect,
  label = "Customer",
  error,
  disabled = false,
}: {
  value: string;
  onSelect: (customer: Customer) => void;
  label?: string;
  error?: boolean;
  disabled?: boolean;
}) {
  const [searchResult, setSearchResult] = useState<Customer[]>([]);

  const searchCustomers = (query: string) => {
    searchCustomersAPI({ query }).then((res) => {
      setSearchResult(res.data);
    });
  };

  const resultStructure = () => {
    return (
      <>
        {searchResult.map((customer) => (
          <div
            key={customer.id}
            onMouseDown={() => {
              onSelect(customer);
              setSearchResult([]);
            }}
            className="px-2 my-2 link-like"
          >
            <div>{nameJoiner(customer)}</div>

            <hr className="mt-2 mb-3 text-gray-200" />
          </div>
        ))}
      </>
    );
  };

  return (
    <MySearchInput
      label={label}
      value={value}
      onSearch={searchCustomers}
      resultStructure={resultStructure}
      error={error}
      disabled={disabled}
    />
  );
}
