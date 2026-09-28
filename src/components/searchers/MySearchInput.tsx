import { useEffect, useState, type JSX } from "react";
import "../my-input/my-input.sass";
import { BiSearch } from "react-icons/bi";
import useDebounce from "src/utils/useDebounce";

type props = {
  label?: string | undefined;
  error?: boolean;
  onSearch: (query: string) => void;
  resultStructure: () => JSX.Element;
  value: string;
  disabled?: boolean;
};

export default function MySearchInput({
  label,
  onSearch,
  resultStructure,
  value,
  error,
  disabled = false,
}: props) {
  const [opened, setOpened] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const closeResultWindow = () => {
    setInputValue(value || "");
    setOpened(false);
  };

  const debouncedValue = useDebounce(inputValue);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (debouncedValue && debouncedValue !== value) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <div className="my-input">
      <div>
        {label && <label className="my-input-label">{label}</label>}
        {error && <span className="my-input-error-sign">!</span>}
      </div>
      <div
        className={`my-input-field my-input-search ${error ? "my-input-field-error" : ""} ${disabled ? "my-input-disabled" : ""}`}
      >
        <input
          type="search"
          className="my-input-search-field"
          value={inputValue}
          onBlur={closeResultWindow}
          onChange={(e) => {
            setInputValue(e.target.value);
            setOpened(true);
          }}
          disabled={disabled}
        ></input>
        <BiSearch className=" my-input-search-icon" />
      </div>
      {error && <p className="my-input-error-text">This field is required</p>}
      {opened ? (
        <div className="my-input-search-result">{resultStructure()}</div>
      ) : (
        <></>
      )}
    </div>
  );
}
