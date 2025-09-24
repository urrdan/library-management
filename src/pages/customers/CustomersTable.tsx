import DataTable from "react-data-table-component";
import { customersData } from "../../apis/data/CustomersData";
import MyButton from "../../components/MyButton";

export default function CustomersTable() {
  const columns = [
    {
      name: "First Name",
      selector: (row: any) => row.firstName,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row: any) => row.lastName,
    },
    {
      name: "Phone",
      selector: (row: any) => row.phone,
    },
    {
      name: "Email",
      selector: (row: any) => row.email,
    },
    {
      name: "Membership Status",
      selector: (row: any) => row.membershipStatus,
    },
    {
      name: "Actions",
      cell: () => {
        return (
          <div>
            <MyButton title="Return" className="mr-1" sm />
          </div>
        );
      },
      sortable: true,
    },
  ];

  return (
    <div>
      <DataTable
        data={customersData}
        columns={columns}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 50, 100]}
      />
    </div>
  );
}
