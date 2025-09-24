import DataTable from "react-data-table-component";
import MyButton from "../../components/MyButton";
import { rentalData } from "../../apis/data/rentalData";
export default function RentalTable() {
  const columns = [
    {
      name: "Book Title",
      selector: (row: any) => row.bookTitle,
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row: any) => row.customerFirstName,
      sortable: true,
    },
    {
      name: "Rented Date",
      selector: (row: any) => row.rentedDate,
      sortable: true,
    },
    {
      name: "Return Date",
      selector: (row: any) => row.returnDate,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: any) => <div>{row.returnDate && "Overdue"}</div>,
      sortable: true,
    },
    /* {
      name: "Full name",
      selector: (row: any) => `${row.firstName || ""} ${row.lastName || ""}`,
      sortable: true,
    }, */
    {
      name: "Actions",
      cell: () => {
        return (
          <div>
            <MyButton title="Return" className="mr-1" sm />
            <MyButton title="Cancel" sm />
          </div>
        );
      },
      sortable: true,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
    { id: 10, lastName: "Roxie", firstName: "Harvey", age: 65 },
    { id: 11, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <div>
      <DataTable
        data={rentalData}
        columns={columns}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 50, 100]}
      />
    </div>
  );
}
