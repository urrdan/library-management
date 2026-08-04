import { useState } from "react";
import { getBooksAPI } from "src/api/booksApi";
import ResourcePage from "src/components/resource-page/ResourcePage";
import { useResource } from "src/hooks/useResource";
import "src/pages/books/books.sass";
import BookForm from "./BookForm";
import BooksTable from "./BooksTable";

export default function Books() {
  const { data: books, loading, refresh } = useResource(getBooksAPI);
  const [openModal, setOpenModal] = useState(false);

  return (
    <ResourcePage
      loading={loading}
      newRecordTitle="New Book"
      onNewRecord={() => setOpenModal(true)}
      onRefresh={refresh}
    >
      <BooksTable books={books} getBooks={refresh} />
      {openModal && (
        <BookForm
          onClose={() => setOpenModal(false)}
          isEditing={false}
          callBack={refresh}
        />
      )}
    </ResourcePage>
  );
}
