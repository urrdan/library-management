import { useEffect, useState, type ReactNode } from "react";
import MySearchInput from "./MySearchInput";
import type { SuccessResponse } from "src/types/apiTypes";

type Props<T> = {
  value: string;
  label: string;
  error?: boolean;
  /** Endpoint the options are loaded from, called once on mount. */
  fetchItems: () => Promise<SuccessResponse<T[]>>;
  /** Text a typed query is matched against. */
  searchText: (item: T) => string;
  renderItem?: (item: T) => ReactNode;
  onSelect: (item: T) => void;
};

export default function EntitySearcher<T>({
  value,
  label,
  error,
  fetchItems,
  searchText,
  renderItem = searchText,
  onSelect,
}: Props<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [searchResult, setSearchResult] = useState<T[]>([]);

  useEffect(() => {
    fetchItems()
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLocaleLowerCase();
    setSearchResult(
      query
        ? items.filter((item) =>
            searchText(item).toLocaleLowerCase().includes(query),
          )
        : [],
    );
  };

  const resultStructure = () => (
    <>
      {searchResult.map((item, index) => (
        <div
          key={index}
          onClick={() => onSelect(item)}
          className="px-2 my-2 link-like"
        >
          {renderItem(item)}
        </div>
      ))}
    </>
  );

  return (
    <MySearchInput
      label={label}
      onChange={onChange}
      resultStructure={resultStructure}
      value={value}
      error={error}
    />
  );
}
