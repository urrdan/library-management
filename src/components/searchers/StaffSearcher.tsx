import { useEffect, useState } from "react";
import MySearchInput from "./MySearchInput";
import { getStaffsAPI } from "src/api/staffApi";
import type { Staff } from "src/types/staffTypes";
import { nameJoiner } from "src/utils/fullNameFormatter";
import { reportError } from "src/utils/errorUtils";

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
  const [searchResult, setSearchResult] = useState<Staff[]>([]);
  const [data, setData] = useState<Staff[]>([]);
  const getData = () => {
    getStaffsAPI()
      .then((res) => setData(res.data))
      .catch((err: unknown) => reportError("StaffSearcher.getData", err));
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let filteredResult: Staff[] = [];
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
