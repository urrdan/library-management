import { getStaffsAPI } from "src/api/staffApi";
import type { Staff } from "src/types/staffTypes";
import { nameJoiner } from "src/utils/fullNameFormatter";
import EntitySearcher from "./EntitySearcher";

export default function StaffSearcher({
  value,
  onSelect,
  label = "Staff",
  error,
}: {
  value: string;
  onSelect: (selectedStaff: Staff) => void;
  label?: string;
  error?: boolean;
}) {
  return (
    <EntitySearcher
      value={value}
      label={label}
      error={error}
      fetchItems={getStaffsAPI}
      searchText={nameJoiner}
      onSelect={onSelect}
    />
  );
}
