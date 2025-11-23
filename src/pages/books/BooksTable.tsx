import DataTable from "react-data-table-component";

import { AiOutlineMenu } from "react-icons/ai";
import type { bookDataType } from "../../apis/data/booksData";
export default function BooksTable({ books }: { books: bookDataType[] }) {
  const columns = [
    {
      name: "Title",
      selector: (row: any) => row.title,
      sortable: true,
      grow: 3,
    },
    {
      name: "Author",
      selector: (row: any) => row.author,
      grow: 2,
    },
    {
      name: "Genre",
      selector: (row: any) => row.genre,
      grow: 2,
    },
    {
      name: "In Store / Total",
      selector: (row: any) => `${row.inStore} / ${row.totalCopies}`,
      grow: 2,
    },
    {
      name: "",
      cell: () => <AiOutlineMenu className="text-xl link-like" />,
    },
  ];

  return (
    <div>
      <DataTable
        data={books}
        columns={columns}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 50, 100]}
      />
    </div>
  );
}
