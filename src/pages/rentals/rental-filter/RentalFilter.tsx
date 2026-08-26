import type { RentalStatusFilter } from "src/types/rentalTypes";
import "./rental-filter.sass";

type Props = {
  value: RentalStatusFilter;
  onChange: (status: RentalStatusFilter) => void;
};

const filters: {
  label: string;
  value: RentalStatusFilter;
}[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Overdue", value: "overdue" },
  { label: "Returned", value: "returned" },
];

export default function RentalTableFilter({ value, onChange }: Props) {
  return (
    <div className="d-flex gap-2 rental-filter">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          className={`rental-filter-btn ${value === filter.value ? "active" : ""}`}
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
