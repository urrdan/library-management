import DataTable, { type TableColumn } from "react-data-table-component";

import type { Customer } from "src/types/customerTypes";
import { RiDeleteBin2Line } from "react-icons/ri";
import { deleteCustomerAPI } from "src/api/customersApi";
import apiWithToast from "src/api/toastifiedApi";
import { useState } from "react";
import ConfirmationModal from "src/components/ConfirmationModal";
import CustomerForm from "./CustomerForm";
import { BiLinkExternal } from "react-icons/bi";
import { mainPagination } from "src/utils/constants";
import { reportError } from "src/utils/errorUtils";

export default function CustomersTable({
  customers,
  getCustomers,
}: {
  customers: Customer[];
  getCustomers: () => void;
}) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<null | Customer>(
    null,
  );
  const [openDelete, setOpenDelete] = useState(false);
  const [recordToBeDeleted, setRecordToBeDeleted] = useState<null | Customer>(
    null,
  );

  const onDeleteCustomer = (customer: Customer) => {
    apiWithToast(deleteCustomerAPI(customer.id))
      .then(() => {
        getCustomers();
        setRecordToBeDeleted(null);
        setOpenDelete(false);
      })
      .catch((err: unknown) => reportError("deleteCustomer", err));
  };
  const columns: TableColumn<Customer>[] = [
    {
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      grow: 1.5,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      grow: 2,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <div className="flex justify-around text-2xl">
            <BiLinkExternal
              className="link-like mr-3"
              onClick={() => {
                setSelectedCustomer(row);
                setOpenEditModal(true);
              }}
            />
            <RiDeleteBin2Line
              className="link-like"
              onClick={() => {
                setRecordToBeDeleted(row);
                setOpenDelete(true);
              }}
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
        data={customers}
        columns={columns}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={mainPagination}
      />
      {openDelete && recordToBeDeleted && (
        <ConfirmationModal
          onClose={() => {
            setOpenDelete(false);
            setRecordToBeDeleted(null);
          }}
          onConfirm={() => onDeleteCustomer(recordToBeDeleted)}
        />
      )}
      {openEditModal && selectedCustomer && (
        <CustomerForm
          onClose={() => {
            setOpenEditModal(false);
            setSelectedCustomer(null);
          }}
          selectedCustomer={selectedCustomer}
          isEditing
          callBack={() => getCustomers()}
        />
      )}
    </div>
  );
}
