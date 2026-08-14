import DataTable, { type TableColumn } from "react-data-table-component";
import type { Book } from "src/types/bookTypes";

export default function DashBookTable({ books }: { books: Book[] }) {
  const columns: TableColumn<Book>[] = [
    {
      id: "title",
      name: "Title",
      cell: (row) => (
        <div className="book-title font-normal">
          <img
            className="book-cover"
            src={row.coverImageUrl || "/images/default-book-cover.png"}
          />
          <div className="font-normal">{row.title}</div>
        </div>
      ),
      sortable: true,
      grow: 3,
    },
    {
      name: "Copies",
      selector: (row) => row.availableCopies,
      cell: (row) => (
        <div className="danger-color font-bold">{row.availableCopies}</div>
      ),
      right: true,
    },
  ];

  return (
    <div className="my-table">
      <DataTable
        data={books}
        columns={columns}
        //pagination={pagination}
      />
    </div>
  );
}
