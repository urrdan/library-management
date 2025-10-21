import { useState } from "react";
import MySearchInput from "./MySearchInput";
import { booksData, type bookDataType } from "../../apis/data/booksData";

export default function BookSearcher({
  value,
  onSelect,
  label = "Book",
  error,
}: {
  value: string;
  onSelect: (selectedBook: bookDataType) => void;
  label?: string;
  error?: boolean;
}) {
  const [searchResult, setSearchResult] = useState<bookDataType[]>([]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let filteredResult: bookDataType[] = [];
    if (value)
      filteredResult = booksData.filter((x) =>
        x.title.toLocaleLowerCase().includes(value)
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
            <div>{item.title}</div>
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
      error={error}
    />
  );
}
