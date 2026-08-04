import { useState } from "react";
import type { TableColumn } from "react-data-table-component";
import { deleteCustomerAPI } from "src/api/customersApi";
import apiWithToast from "src/api/toastifiedApi";
import RecordsTable from "src/components/records-table/RecordsTable";
import { personColumns } from "src/components/records-table/personColumns";
import type { Customer } from "src/types/customerTypes";
import CustomerForm from "./CustomerForm";

export default function CustomersTable({
  customers,
  getCustomers,
}: {
  customers: Customer[];
  getCustomers: () => void;
}) {
  const [selectedCustomer, setSelectedCustomer] = useState<null | Customer>(
    null,
  );

  const onDeleteCustomer = (customer: Customer) => {
    apiWithToast(deleteCustomerAPI(customer.id))
      .then(() => getCustomers())
      .catch((res) => console.log(res.message));
  };

  const columns: TableColumn<Customer>[] = [
    ...personColumns<Customer>(),
    {
      name: "Status",
      selector: (row) => row.status,
    },
  ];

  return (
    <>
      <RecordsTable
        data={customers}
        columns={columns}
        onEdit={setSelectedCustomer}
        onDelete={onDeleteCustomer}
      />
      {selectedCustomer && (
        <CustomerForm
          onClose={() => setSelectedCustomer(null)}
          selectedCustomer={selectedCustomer}
          isEditing
          callBack={getCustomers}
        />
      )}
    </>
  );
}
