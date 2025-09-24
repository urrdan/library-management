import DataTable from "react-data-table-component";
import MyButton from "../../components/MyButton";
import { CgDetailsMore } from "react-icons/cg";
import { booksData } from "../../apis/data/booksData";
export default function BooksTable() {
  const columns = [
    {
      name: "Title",
      selector: (row: any) => row.title,
      sortable: true,
    },
    {
      name: "Author",
      selector: (row: any) => row.author,
    },
    {
      name: "Genre",
      selector: (row: any) => row.genre,
    },
    {
      name: "In Store / Total",
      selector: (row: any) => `${row.inStore} / ${row.totalCopies}`,
    },
    {
      name: "Actions",
      cell: () => {
        return (
          <div>
            <MyButton title="Return" className="mr-1" sm />
            <CgDetailsMore />
          </div>
        );
      },
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
