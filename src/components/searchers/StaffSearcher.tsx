import { useState } from "react";
import MySearchInput from "./MySearchInput";

export default function StaffSearcher({
  value,
  onSelect,
  label = "Staff",
}: {
  value: string;
  onSelect: (selectedStaff: { id: number; name: string }) => void;
  label?: string;
}) {
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const result = [
    { id: 2, name: "Alex Jones" },
    { id: 3, name: "Jesicca Brown" },
    { id: 4, name: "John Jackson" },
    { id: 5, name: "Haifa Manroe" },
  ];
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let filteredResult: { id: number; name: string }[] = [];
    if (value)
      filteredResult = result.filter((x) =>
        x.name.toLocaleLowerCase().includes(value)
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
            {item.name}
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
