import { useState } from "react";
import MySearchInput from "./MySearchInput";

export default function CustomerSearcher({
  value,
  onSelect,
  label = "Customer",
}: {
  value: string;
  onSelect: (selectedCustomer: { id: number; name: string }) => void;
  label?: string;
}) {
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const result = [
    { id: 2, name: "hello" },
    { id: 3, name: "bye" },
    { id: 4, name: "Ulama" },
    { id: 5, name: "chafi" },
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
