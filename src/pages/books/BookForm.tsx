import { MdClose } from "react-icons/md";
import { useState } from "react";
import MyButton from "src/components/my-button/MyButton";
import MyInput from "src/components/my-input/MyInput";
import MyModal, {
  MyModalBody,
  MyModalHead,
} from "src/components/my-modal/MyModal";
import apiWithToast from "src/api/toastifiedApi";
import { createBookAPI, updateBookAPI } from "src/api/booksApi";
import type { Book, BookInputForm } from "src/types/bookTypes";
import formValidation from "src/utils/formValidation";

const bookTemplate: BookInputForm = {
  title: "",
  totalCopies: "",
  availableCopies: "",
  genre: "",
  author: "",
  pages: "",
  isbn: "",
  coverImageUrl: "",
  releasedDate: "",
};

const fieldsToBeValidated: (keyof BookInputForm)[] = [
  "title",
  "totalCopies",
  "availableCopies",
  "genre",
  "author",
  "pages",
  "releasedDate",
];

type CreateProps = {
  isEditing: false;
  selectedBook?: never;
};

type EditProps = {
  isEditing: true;
  selectedBook: Book;
};

type BookFormProps = { onClose: () => void; callBack: () => void } & (
  CreateProps | EditProps
);

const toInputForm = (book: Book): BookInputForm => ({
  ...book,
  totalCopies: book.totalCopies.toString(),
  availableCopies: book.availableCopies.toString(),
  pages: book.pages.toString(),
});

const toNumber = (value: string) => (value === "" ? NaN : Number(value));

export default function BookForm(props: BookFormProps) {
  const { isEditing, onClose, callBack, selectedBook } = props;

  const [stateData, setStateData] = useState<BookInputForm>(
    selectedBook ? toInputForm(selectedBook) : bookTemplate,
  );
  const [errorData, setErrorData] = useState<
    Partial<Record<keyof BookInputForm, boolean>>
  >({});

  const onChange = <K extends keyof BookInputForm>(
    propName: K,
    value: BookInputForm[K],
  ) => {
    setStateData((prev) => ({ ...prev, [propName]: value }));
  };

  const onSave = () => {
    const dataToSubmit = {
      ...stateData,
      totalCopies: toNumber(stateData.totalCopies),
      availableCopies: toNumber(stateData.availableCopies),
      pages: toNumber(stateData.pages),
    };
    const { errorObj, hasError } = formValidation(
      stateData,
      fieldsToBeValidated,
    );
    setErrorData(errorObj);
    if (hasError) return;

    const apiPromise = isEditing
      ? apiWithToast(updateBookAPI(dataToSubmit, selectedBook.id))
      : apiWithToast(createBookAPI(dataToSubmit));

    apiPromise
      .then(() => {
        callBack();
        onClose();
      })
      .catch((err) => err);
  };

  return (
    <MyModal onClose={onClose}>
      <MyModalHead>
        <div>
          <h4>{isEditing ? "Edit Book Info" : "Create New Book"}</h4>
        </div>
        <div className="flex">
          <MyButton title="Save" onClick={onSave} />
          <MdClose
            className="ml-2 link-like text-3xl text-gray-500"
            onClick={onClose}
          />
        </div>
      </MyModalHead>

      <MyModalBody>
        <div className="grid grid-cols-2 gap-4 gap-x-6">
          <MyInput
            label="Title"
            value={stateData.title}
            onChange={(value) => onChange("title", value)}
            error={errorData.title}
          />
          <MyInput
            label="Genre"
            value={stateData.genre}
            onChange={(value) => onChange("genre", value)}
            error={errorData.genre}
          />
          <MyInput
            label="Author"
            value={stateData.author}
            onChange={(value) => onChange("author", value)}
            error={errorData.author}
          />
          <MyInput
            label="Total Copies"
            type="number"
            value={stateData.totalCopies}
            onChange={(value) => onChange("totalCopies", value)}
            error={errorData.totalCopies}
          />
          <MyInput
            label="Available Copies"
            type="number"
            value={stateData.availableCopies}
            onChange={(value) => onChange("availableCopies", value)}
            error={errorData.availableCopies}
          />
          <MyInput
            label="Pages"
            type="number"
            value={stateData.pages}
            onChange={(value) => onChange("pages", value)}
            error={errorData.pages}
          />
          <MyInput
            label="ISBN"
            value={stateData.isbn}
            onChange={(value) => onChange("isbn", value)}
            error={errorData.isbn}
          />
          <MyInput
            label="Released Date"
            value={stateData.releasedDate}
            onChange={(value) => onChange("releasedDate", value)}
            error={errorData.releasedDate}
          />
        </div>
      </MyModalBody>
    </MyModal>
  );
}
