import { MdClose } from "react-icons/md";
import MyButton from "../../components/MyButton";
import MyInput from "../../components/MyInput";
import MyModal, { MyModalBody, MyModalHead } from "../../components/MyModal";
import { useState } from "react";
import apiWithToast from "src/api/toastifiedApi";
import { postApi, updateApi } from "src/api/mockAPI";
import type { Book, BookInputForm } from "./bookTypes";

const bookTemplate = {
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

type CreateProps = {
  isEditing: false;
  selectedBook?: never;
};

type EditProps = {
  isEditing: true;
  selectedBook: Book;
};

type BookFormProps = { onClose: () => void; callBack: () => void } & (
  | CreateProps
  | EditProps
);

export default function BookForm(props: BookFormProps) {
  const fieldsToBeValidated: (keyof BookInputForm)[] = [
    "title",
    "totalCopies",
    "availableCopies",
    "genre",
    "author",
    "pages",
    //"isbn",
    "releasedDate",
  ];
  const { isEditing, onClose, callBack, selectedBook } = props;

  const [stateData, setStateData] = useState<BookInputForm>(
    (selectedBook && {
      ...selectedBook,
      totalCopies: selectedBook.totalCopies.toString(),
      pages: selectedBook.pages.toString(),
      availableCopies: selectedBook.availableCopies.toString(),
    }) ||
      bookTemplate,
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

  function validateData<T>(
    data: T, //object to be validated
    fieldsToValidate: (keyof T)[], //prop names
  ) {
    const result: Partial<Record<keyof T, boolean>> = {};
    fieldsToValidate.forEach((x) => {
      if (!data[x] && data[x] !== 0) result[x] = true;
    });
    return {
      errorObj: result,
      hasError: Object.values(result).some((x) => x == true),
    };
  }
  const onSave = () => {
    console.log(stateData);
    function convertToDomain(x: string): number {
      if (x != "") return Number(x);
      return NaN;
    }

    const dataToSubmit = {
      ...stateData,
      totalCopies: convertToDomain(stateData.totalCopies),
      pages: convertToDomain(stateData.pages),
      availableCopies: convertToDomain(stateData.availableCopies),
    };
    const { errorObj, hasError } = validateData(
      dataToSubmit,
      fieldsToBeValidated,
    );
    setErrorData(errorObj);
    if (hasError) {
      console.log("express validation errors", errorObj);
    } else {
      console.log("call APi");
    }

    if (hasError) return;

    const apiPromise = isEditing
      ? apiWithToast(updateApi("/books", selectedBook.id, dataToSubmit))
      : apiWithToast(postApi("/books", dataToSubmit));

    apiPromise
      .then((res) => {
        res;
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
            onChange={(value) => {
              onChange("title", value);
            }}
            error={errorData.title}
          />
          <MyInput
            label="Genre"
            value={stateData.genre}
            onChange={(value) => {
              onChange("genre", value);
            }}
            error={errorData.genre}
          />

          <MyInput
            label="Author"
            value={stateData.author}
            onChange={(value) => {
              onChange("author", value);
            }}
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
            value={stateData.pages}
            onChange={(value) => onChange("pages", value)}
            type="number"
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
