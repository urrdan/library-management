import "./table-filter.sass";

type Props<T> = {
  value: T;
  onChange: (status: T) => void;
  filters: { label: string; value: T }[];
};

export default function TableFilter<T>({ value, onChange, filters }: Props<T>) {
  return (
    <div className="d-flex gap-2 table-filter">
      {filters.map((filter) => (
        <button
          key={filter.label}
          type="button"
          className={`table-filter-btn ${value === filter.value ? "active" : ""}`}
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
