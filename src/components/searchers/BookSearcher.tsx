import { useEffect, useState } from "react";
import MySearchInput from "./MySearchInput";
import type { Book } from "src/pages/books/bookTypes";
import { getBooksAPI } from "src/api/booksApi";

export default function BookSearcher({
  value,
  onSelect,
  label = "Book",
  error,
}: {
  value: string;
  onSelect: (selectedBook: Book) => void;
  label?: string;
  error?: boolean;
}) {
  const [searchResult, setSearchResult] = useState<Book[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let filteredResult: Book[] = [];
    if (value)
      filteredResult = books.filter((x) =>
        x.title.toLocaleLowerCase().includes(value),
      );

    setSearchResult(filteredResult);
  };

  useEffect(() => {
    getBooksAPI().then((res) => setBooks(res.data));
  }, []);

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
      onChange={onChange}
      resultStructure={resultStructure}
      value={value}
      error={error}
    />
  );
}
