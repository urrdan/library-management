import { useState } from "react";
import MySearchInput from "./MySearchInput";
import { staffData, type staffDataType } from "../../apis/data/staffData";

export default function StaffSearcher({
  value,
  onSelect,
  label = "Staff",
}: {
  value: string;
  onSelect: (selectedStaff: staffDataType) => void;
  label?: string;
}) {
  const [searchResult, setSearchResult] = useState<staffDataType[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let filteredResult: staffDataType[] = [];
    if (value)
      filteredResult = staffData.filter((x) =>
        x.staffName.toLocaleLowerCase().includes(value)
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
            {item.staffName}
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
