import { useState } from "react";
import type { TableColumn } from "react-data-table-component";
import { AiOutlineMenu } from "react-icons/ai";
import { deleteBookAPI } from "src/api/booksApi";
import apiWithToast from "src/api/toastifiedApi";
import RecordsTable from "src/components/records-table/RecordsTable";
import type { Book } from "src/types/bookTypes";
import BookForm from "./BookForm";

export default function BooksTable({
  books,
  getBooks,
}: {
  books: Book[];
  getBooks: () => void;
}) {
  const [selectedBook, setSelectedBook] = useState<null | Book>(null);

  const deleteBook = (book: Book) => {
    apiWithToast(deleteBookAPI(book.id))
      .then(() => getBooks())
      .catch((res) => console.log(res.message));
  };

  const columns: TableColumn<Book>[] = [
    {
      name: "Title",
      cell: (row) => (
        <div className="book-title">
          <img
            className="book-cover"
            src={row.coverImageUrl || "/images/default-book-cover.png"}
          />
          {row.title}
        </div>
      ),
      sortable: true,
      grow: 3,
    },
    {
      name: "Author",
      selector: (row) => row.author,
      grow: 2,
    },
    {
      name: "Genre",
      selector: (row) => row.genre,
      grow: 2,
    },
    {
      name: "Availability",
      selector: (row) => row.availableCopies,
      cell: (row) => {
        const getCount = () => {
          if (row.availableCopies < 8) {
            if (row.availableCopies < 4) return "empty-count";
            return "low-count";
          }
          return "";
        };
        return (
          <div className={`availability ${getCount()}`}>
            {row.availableCopies} Of {row.totalCopies}
          </div>
        );
      },
      grow: 2,
    },
  ];

  return (
    <>
      <RecordsTable
        data={books}
        columns={columns}
        onEdit={setSelectedBook}
        onDelete={deleteBook}
        editIcon={<AiOutlineMenu />}
      />
      {selectedBook && (
        <BookForm
          onClose={() => setSelectedBook(null)}
          selectedBook={selectedBook}
          isEditing
          callBack={getBooks}
        />
      )}
    </>
  );
}
