import DataTable from "react-data-table-component";
import { booksData } from "../../apis/data/booksData";
export default function OverviewTable() {
  const columns = [
    {
      name: "Book Title",
      selector: (row: any) => row.title,
      sortable: true,
      grow: 2,
    },
    {
      name: "Customer Name",
      selector: (row: any) => row.author,
      sortable: true,
    },
    {
      name: "Rented Date",
      selector: (row: any) => row.genre,
      sortable: true,
    },

    {
      name: "Status",
      selector: (row: any) => row.pages,
      sortable: true,
    },
  ];

  return (
    <div>
      <DataTable
        data={booksData}
        columns={columns}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 50, 100]}
      />
    </div>
  );
}
