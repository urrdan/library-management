import { MdClose } from "react-icons/md";
import MyButton from "../../components/MyButton";
import MyInput from "../../components/MyInput";
import { MyModalBody, MyModalHead } from "../../components/MyModal";
import { useContext, useState } from "react";
import { mainContext } from "../MainContext";
import type { bookDataType } from "../../apis/data/booksData";

export default function BookForm({
  data,
  isEditing,
  onClose,
}: {
  data: bookDataType;
  isEditing?: boolean;
  onClose: () => void;
}) {
  const { apis } = useContext(mainContext);
  const [stateData, setStateData] = useState<bookDataType>(data);
  const [errorData, setErrorData] = useState<any>({});

  const onChange = (
    dataToBeModified: { value: string | number; propName: string }[]
  ) => {
    let modifiedData: { [key: string]: any } = {};
    dataToBeModified.forEach((c) => {
      modifiedData[c.propName] = c.value;
    });
    setErrorData((prev: any) => {
      dataToBeModified.forEach((x) => (prev[x.propName] = false));
      return prev;
    });

    setStateData({ ...stateData, ...modifiedData });
  };

  const validation = (
    l: string[],
    data: any,
    setError: any,
    callback: () => void
  ) => {
    const c: { [key: string]: boolean } = {};
    l.forEach((x) => {
      console.log(data[x]);
      !data[x] && (c[x] = true);
    });
    setError(c);
    Object.values(c).find((x) => x == true) ? () => {} : callback();
  };
  const onSave = () => {
    const method = isEditing ? "update" : "post";
    validation(
      ["title", "genre", "author", "totalCopies"],
      stateData,
      setErrorData,
      () => {
        apis("books", method, stateData);
        onClose();
      }
    );
  };

  return (
    <>
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
            onChange={(e) => {
              onChange([{ propName: "title", value: e }]);
            }}
            error={errorData.title}
          />
          <MyInput
            label="Genre"
            value={stateData.genre}
            onChange={(e) => {
              onChange([
                {
                  propName: "genre",
                  value: e,
                },
              ]);
            }}
            error={errorData.genre}
          />

          <MyInput
            label="Author"
            value={stateData.author}
            onChange={(e) => {
              onChange([{ propName: "author", value: e }]);
            }}
            error={errorData.author}
          />

          <MyInput
            label="Total Copies"
            value={stateData.totalCopies}
            onChange={(e) =>
              onChange([
                { propName: "totalCopies", value: e },
                { propName: "inStore", value: e },
              ])
            }
            error={errorData.totalCopies}
          />
        </div>
      </MyModalBody>
    </>
  );
}
