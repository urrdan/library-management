import DataTable from "react-data-table-component";
import MyButton from "../../components/MyButton";
import type { rentalDataType } from "../../apis/data/rentalData";
export default function RentalTable({
  rentals,
}: {
  rentals: rentalDataType[];
}) {
  const columns = [
    {
      name: "Book Title",
      selector: (row: any) => row.bookTitle,
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row: any) => row.customerName,
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

  return (
    <div>
      <DataTable
        data={rentals}
        columns={columns}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 50, 100]}
      />
    </div>
  );
}
