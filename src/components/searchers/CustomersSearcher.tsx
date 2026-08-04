import { getCustomersAPI } from "src/api/customersApi";
import type { Customer } from "src/types/customerTypes";
import { nameJoiner } from "src/utils/fullNameFormatter";
import EntitySearcher from "./EntitySearcher";

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
  return (
    <EntitySearcher
      value={value}
      label={label}
      error={error}
      fetchItems={getCustomersAPI}
      searchText={nameJoiner}
      onSelect={onSelect}
    />
  );
}
