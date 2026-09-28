import { useState } from "react";
import MySearchInput from "./MySearchInput";
import type { Book } from "src/pages/books/bookTypes";
import { searchBooksAPI } from "src/api/booksApi";

export default function BookSearcher({
  value,
  onSelect,
  label = "Book",
  error,
  disabled = false,
}: {
  value: string;
  onSelect: (selectedBook: Book) => void;
  label?: string;
  error?: boolean;
  disabled?: boolean;
}) {
  const [searchResult, setSearchResult] = useState<Book[]>([]);

  const searchBooks = (query: string) => {
    searchBooksAPI({ query: query }).then((res) => {
      setSearchResult(res.data);
    });
  };

  const resultStructure = () => {
    return (
      <>
        {searchResult.map((item, index) => (
          <div
            key={index}
            onMouseDown={() => {
              onSelect(item);
              setSearchResult([]);
            }}
            className="px-2 my-2 link-like"
          >
            <div>{item.title}</div>
            <div className="text-gray-500 flex justify-end">
              Instore: {item.availableCopies}/{item.totalCopies}
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
      onSearch={searchBooks}
      resultStructure={resultStructure}
      value={value}
      error={error}
      disabled={disabled}
    />
  );
}
