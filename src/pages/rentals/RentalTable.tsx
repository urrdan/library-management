import DataTable from "react-data-table-component";
import type { rentalDataType } from "../../apis/data/rentalData";
import { mainContext } from "../MainContext";
import { useContext } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BiLinkExternal } from "react-icons/bi";
export default function RentalTable({
  rentals,
  onEditing,
}: {
  rentals: rentalDataType[];
  onEditing: (arg: rentalDataType) => void;
}) {
  const { apis } = useContext(mainContext);

  const columns = [
    {
      name: "Book Title",
      selector: (row: any) => row.bookTitle,
      sortable: true,
      grow: 2,
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
      cell: (record: any) => {
        return (
          <div className="flex text-2xl">
            <BiLinkExternal
              className=" link-like mr-2"
              onClick={() => {
                onEditing(record);
              }}
            />
            <MdOutlineDeleteForever
              className=" link-like"
              onClick={() => apis("rental", "delete", record)}
            />
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
