import { useEffect, useState } from "react";
import MyButton from "../../components/MyButton";
import BooksTable from "./BooksTable";
import { IoMdAdd } from "react-icons/io";
import BookForm from "./BookForm";
import apiWithToast from "src/api/toastifiedApi";
import { getApi } from "src/api/mockAPI";
import type { Book } from "./bookTypes";
import "src/pages/books/books.sass";
import Loading from "src/components/loading/Loading";
import ErrorState from "src/components/error-state/ErrorState";
import { getErrorMessage, reportError } from "src/utils/errorUtils";

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  function getBooks() {
    setLoading(true);
    setLoadError(null);
    apiWithToast(getApi<Book>("/books"))
      .then((res) => setBooks(res.data))
      .catch((err: unknown) => {
        reportError("getBooks", err);
        setLoadError(getErrorMessage(err));
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div style={{ height: 300, width: "100%" }}>
      {loading ? (
        <Loading />
      ) : loadError ? (
        <ErrorState message={loadError} onRetry={getBooks} />
      ) : (
        <>
          <div className="mb-4 flex justify-between ">
            <div></div>
            <MyButton
              icon={<IoMdAdd />}
              title="New Book"
              onClick={() => {
                setOpenModal(true);
              }}
            />
            <MyButton
              icon={<IoMdAdd />}
              title="Refreshi"
              onClick={() => {
                getBooks();
              }}
            />
          </div>
          <BooksTable books={books} getBooks={getBooks} />

          {openModal && (
            <BookForm
              onClose={() => {
                setOpenModal(false);
              }}
              isEditing={false}
              callBack={() => getBooks()}
            />
          )}
        </>
      )}
    </div>
  );
}
