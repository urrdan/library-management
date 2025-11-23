import { useState } from "react";
import MyModal from "../../components/MyModal";
import MyButton from "../../components/MyButton";
import BooksTable from "./BooksTable";
import { IoMdAdd } from "react-icons/io";
import BookForm from "./BookForm";
import { bookDataTemplate, booksData } from "../../apis/data/booksData";

export default function Books() {
  const [openModal, setOpenModal] = useState(false);

  type bb = { name: string };

  function cc<T>(x: T): T {
    return { ...x, id: 7 };
  }
  const xx = (x: bb): bb & { id: number } => {
    return { ...x, id: 7 };
  };
  xx({ name: "hello" });
  cc({ name: "hello" });

  return (
    <div style={{ height: 300, width: "100%" }}>
      <div className="mb-4 flex justify-between ">
        <div></div>
        <MyButton
          icon={<IoMdAdd />}
          title="New Book"
          onClick={() => {
            //setOpenModal(true);
          }}
        />
      </div>
      <BooksTable books={booksData} />
      {openModal && (
        <MyModal
          onClose={() => {
            setOpenModal(false);
          }}
        >
          <BookForm
            onClose={() => setOpenModal(false)}
            data={bookDataTemplate}
          />
        </MyModal>
      )}
    </div>
  );
}
