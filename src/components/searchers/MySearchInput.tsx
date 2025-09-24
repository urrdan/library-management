import { useEffect, useState, type JSX } from "react";
import { BiSearch } from "react-icons/bi";

type props = {
  label?: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  //searchResult: any[];
  resultStructure: () => JSX.Element;
  value: string;
};

export default function MySearchInput({
  label,
  onChange,
  //searchResult,
  resultStructure,
  value,
}: props) {
  const [opened, setOpened] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const closeResultWindow = () => {
    setInputValue(value || "");
    setTimeout(() => {
      setOpened(false);
    }, 1000);
  };
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  return (
    <div className="relative">
      {label && <label className="block">{label}</label>}
      <div className="flex items-center">
        <input
          type="search"
          className="p-2 py-1 border-1 border-r-0 border-gray-400 rounded-lg rounded-r-none"
          value={inputValue}
          onBlur={closeResultWindow}
          onChange={(e) => {
            setInputValue(e.target.value);
            setOpened(true);
            onChange(e);
          }}
        ></input>
        <BiSearch className="text-[30px] text-gray-400  p-1 border-1 rounded-lg rounded-l-none" />
      </div>
      {opened ? (
        <div className=" w-full z-1  absolute overflow-y-scroll shadow-gray-400  shadow-[0_0_10px] bg-white max-h-40 rounded-lg">
          {resultStructure()}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
