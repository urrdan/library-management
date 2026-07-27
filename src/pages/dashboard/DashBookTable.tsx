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
          {row.title}
        </div>
      ),
      sortable: true,
      grow: 3,
    },
    {
      name: "Copies",
      selector: (row) => row.availableCopies,
      cell: (row) => (
        <div className="text-red-600 font-bold">{row.totalCopies}</div>
      ),
      right: true,
    },
  ];

  return (
    <div>
      <DataTable
        data={books}
        columns={columns}
        //pagination={pagination}
      />
    </div>
  );
}
