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

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  function getBooks() {
    apiWithToast(getApi<Book>("/books"))
      .then((res) => {
        let data = res.data;
        data.map((r) => r);
        console.log(data[4]);
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div style={{ height: 300, width: "100%" }}>
      {loading ? (
        <Loading />
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
