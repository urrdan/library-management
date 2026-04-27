import DataTable, { type TableColumn } from "react-data-table-component";

import { AiOutlineMenu } from "react-icons/ai";
import type { Book } from "./bookTypes";
import BookForm from "./BookForm";
import { useState } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { deleteApi } from "src/api/mockAPI";
import apiWithToast from "src/api/toastifiedApi";
export default function BooksTable({
  books,
  getBooks,
}: {
  books: Book[];
  getBooks: () => void;
}) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<null | Book>(null);
  const deleteBook = (book: Book) => {
    apiWithToast(deleteApi("/books", book.id)).then(() => {
      getBooks();
    });
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
    {
      name: "",
      cell: (row) => (
        <div className="book-actions">
          <AiOutlineMenu
            className="text-xl link-like"
            onClick={() => {
              setSelectedBook(row);
              setOpenEditModal(true);
            }}
          />
          <RiDeleteBin2Line onClick={() => deleteBook(row)} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <DataTable
        data={books}
        columns={columns}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 50, 100]}
      />
      {openEditModal && selectedBook && (
        <BookForm
          onClose={() => {
            setOpenEditModal(false);
            setSelectedBook(null);
          }}
          selectedBook={selectedBook}
          isEditing
          callBack={() => getBooks()}
        />
      )}
    </div>
  );
}
