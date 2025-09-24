import { useState } from "react";
import MySearchInput from "./MySearchInput";

export default function BookSearcher({
  value,
  onSelect,
  label = "Book",
}: {
  value: string;
  onSelect: (selectedBook: { id: number; name: string }) => void;
  label?: string;
}) {
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const result = [
    { id: 2, name: "The Firm", inStore: 9, totalCopies: 12 },
    { id: 3, name: "The Witch And Twelve Slaves", inStore: 7, totalCopies: 8 },
    { id: 4, name: "A Narrow Escape", inStore: 3, totalCopies: 6 },
    { id: 5, name: "Marie Has A Secrete", inStore: 11, totalCopies: 16 },
  ];
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let filteredResult: {
      id: number;
      name: string;
      inStore: number;
      totalCopies: number;
    }[] = [];
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
            <div>{item.name}</div>
            <div className="text-gray-500 flex justify-end">
              Instore: {item.inStore}/{item.totalCopies}
            </div>
            <hr className="mt-2 mb-3 text-gray-200" />
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
