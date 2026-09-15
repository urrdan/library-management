import DataTable, { type TableColumn } from "react-data-table-component";
import BookForm from "./BookForm";
import { useState } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import apiWithToast from "src/api/toastifiedApi";
import { deleteBookAPI } from "src/api/booksApi";
import type { Book } from "src/types/bookTypes";
import StatusBadge from "src/components/status-badge/StatusBadge";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import ConfirmationModal from "src/components/my-modal/ConfirmationModal";
import { FiEdit } from "react-icons/fi";
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGINATION_OPTIONS,
  LOW_BOOK_STOCK_THRESHOLD,
} from "src/utils/constants";
import Loading from "src/components/loading/Loading";
export default function BooksTable({
  books,
  getBooks,
  paginationTotalRows,
  paginationPerPage = DEFAULT_PAGE_SIZE,
  onChangePage,
  onChangeRowsPerPage,
  resetDefaultPage,
  loading,
}: {
  books: Book[];
  getBooks: () => void;
  paginationTotalRows?: number;
  paginationPerPage?: number;
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (rowsPerPage: number) => void;
  resetDefaultPage?: boolean;
  loading?: boolean;
}) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<null | Book>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [recordToBeDeleted, setRecordToBeDeleted] = useState<null | Book>(null);
  const onDeleteBook = (book: Book) => {
    apiWithToast(deleteBookAPI(book.id))
      .then(() => {
        getBooks();
      })
      .catch((res) => console.log(res.message));
  };
  const columns: TableColumn<Book>[] = [
    {
      name: "Title",
      cell: (row) => (
        <div className="book-title">
          <img
            className="book-cover"
            src={/* row.coverImageUrl || */ "/images/default-book-cover.png"}
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
        const getStatus = () => {
          if (row.availableCopies <= LOW_BOOK_STOCK_THRESHOLD) {
            if (row.availableCopies < 1) return "danger";
            return "warning";
          }
          return "success";
        };
        return (
          <StatusBadge
            title={`${row.availableCopies} Of ${row.totalCopies}`}
            status={getStatus()}
          />
        );
      },
      grow: 2,
    },
    {
      name: "",
      cell: (row) => (
        <div className="table-actions">
          <FiEdit
            className="text-xl link-like"
            onClick={() => {
              setSelectedBook(row);
              setOpenEditModal(true);
            }}
          />
          <RiDeleteBin2Line
            className="text-xl link-like"
            onClick={() => {
              setRecordToBeDeleted(row);
              setOpenDelete(true);
            }}
          />
          <IoEllipsisVerticalSharp />
        </div>
      ),
    },
  ];

  return (
    <div className="my-table">
      <DataTable
        data={books}
        columns={columns}
        pagination
        paginationPerPage={paginationPerPage}
        paginationRowsPerPageOptions={DEFAULT_PAGINATION_OPTIONS}
        paginationTotalRows={paginationTotalRows}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        paginationServer
        paginationResetDefaultPage={resetDefaultPage}
        progressPending={loading}
        progressComponent={<Loading />}
      />
      {openDelete && recordToBeDeleted && (
        <ConfirmationModal
          onClose={() => {
            setOpenDelete(false);
            setRecordToBeDeleted(null);
          }}
          onConfirm={() => onDeleteBook(recordToBeDeleted)}
        />
      )}
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
