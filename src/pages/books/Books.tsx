import { useEffect, useState } from "react";
import MyButton from "../../components/my-button/MyButton";
import BooksTable from "./BooksTable";
import { IoMdAdd } from "react-icons/io";
import BookForm from "./BookForm";
import apiWithToast from "src/api/toastifiedApi";
import "src/pages/books/books.sass";
import { getBooksAPI } from "src/api/booksApi";
import type { Book, BookStatusFilter } from "src/types/bookTypes";
import TableFilter from "src/components/table-filter/TableFilters";
import { useSearchParams } from "react-router-dom";
import { DEFAULT_PAGE_SIZE } from "src/utils/constants";

export default function Books() {
  const [searchParams] = useSearchParams();
  const initialStatus =
    (searchParams.get("status") as BookStatusFilter) || "all";
  const [status, setStatus] = useState<BookStatusFilter>(initialStatus);
  const [books, setBooks] = useState<Book[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [pagination, setPagination] = useState({
    page: page,
    pageSize: pageSize,
    totalRecords: 0,
    totalPages: 0,
  });
  const resetPagination = () => {
    setPage(1);
    setResetPaginationToggle((prev) => !prev);
  };

  function getBooks() {
    setLoading(true);
    apiWithToast(getBooksAPI({ page, pageSize, status }))
      .then((res) => {
        res.pagination && setPagination(res.pagination);
        setBooks(res.data);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getBooks();
  }, [status, page, pageSize]);

  return (
    <div style={{ height: 300, width: "100%" }}>
      <div className="mb-4 flex justify-between ">
        <TableFilter<BookStatusFilter>
          filters={[
            { label: "All", value: "all" },
            { label: "available", value: "available" },
            { label: "Low Stock", value: "low-stock" },
            { label: "Checked Out", value: "checked-out" },
          ]}
          value={status}
          onChange={(value) => {
            setStatus(value);
            resetPagination();
          }}
        />
        <MyButton
          icon={<IoMdAdd />}
          title="New Book"
          onClick={() => {
            setOpenModal(true);
          }}
        />
      </div>
      <BooksTable
        books={books}
        getBooks={getBooks}
        paginationTotalRows={pagination.totalRecords}
        paginationPerPage={pageSize}
        onChangePage={(page) => {
          setPage(page);
        }}
        onChangeRowsPerPage={(newPageSize) => {
          setPageSize(newPageSize);
          resetPagination();
        }}
        resetDefaultPage={resetPaginationToggle}
        loading={loading}
      />

      {openModal && (
        <BookForm
          onClose={() => {
            setOpenModal(false);
          }}
          isEditing={false}
          callBack={() => getBooks()}
        />
      )}
    </div>
  );
}
