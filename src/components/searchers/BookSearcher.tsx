import { getBooksAPI } from "src/api/booksApi";
import type { Book } from "src/types/bookTypes";
import EntitySearcher from "./EntitySearcher";

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
  return (
    <EntitySearcher
      value={value}
      label={label}
      error={error}
      fetchItems={getBooksAPI}
      searchText={(book) => book.title}
      renderItem={(book) => (
        <>
          <div>{book.title}</div>
          <div className="text-gray-500 flex justify-end">
            Instore: {book.availableCopies}/{book.totalCopies}
          </div>
          <hr className="mt-2 mb-3 text-gray-200" />
        </>
      )}
      onSelect={onSelect}
    />
  );
}
