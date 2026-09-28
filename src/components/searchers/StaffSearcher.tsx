import { useState } from "react";
import MySearchInput from "./MySearchInput";
import type { Staff } from "src/types/staffTypes";
import { nameJoiner } from "src/utils/stringUtils";
import { searchStaffAPI } from "src/api/staffApi";

export default function StaffSearcher({
  value,
  onSelect,
  label = "Staff",
  error,
  disabled = false,
}: {
  value: string;
  onSelect: (staff: Staff) => void;
  label?: string;
  error?: boolean;
  disabled?: boolean;
}) {
  const [searchResult, setSearchResult] = useState<Staff[]>([]);

  const searchStaff = (query: string) => {
    searchStaffAPI({ query }).then((res) => {
      setSearchResult(res.data);
    });
  };

  const resultStructure = () => {
    return (
      <>
        {searchResult.map((staff) => (
          <div
            key={staff.id}
            onMouseDown={() => {
              onSelect(staff);
              setSearchResult([]);
            }}
            className="px-2 my-2 link-like"
          >
            <div>{nameJoiner(staff)}</div>

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
      onSearch={searchStaff}
      resultStructure={resultStructure}
      error={error}
      disabled={disabled}
    />
  );
}
