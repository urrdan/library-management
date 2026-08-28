import DataTable, { type TableColumn } from "react-data-table-component";

import type { Customer, CustomerStatus } from "src/types/customerTypes";
import { RiDeleteBin2Line } from "react-icons/ri";
import {
  deleteCustomerAPI,
  updateCustomerStatusAPI,
} from "src/api/customersApi";
import apiWithToast from "src/api/toastifiedApi";
import { useState } from "react";
import ConfirmationModal from "src/components/my-modal/ConfirmationModal";
import { BiLinkExternal } from "react-icons/bi";
import { defaultPaginationOptions } from "src/utils/constants";
import TableActionMenu from "src/components/table-action-menu/TableActionMenu";
import { FiEdit } from "react-icons/fi";
import CustomerRentalsModal from "./customer-modals/CustomerRentalsModal";
import type { StatusBadgeType } from "src/components/status-badge/StatusBadge";
import StatusBadge from "src/components/status-badge/StatusBadge";
import EditCustomerModal from "./customer-modals/EditCustomerModal";

export default function CustomersTable({
  customers,
  getCustomers,
  paginationTotalRows,
  paginationPerPage = 10,
  onChangePage,
  onChangeRowsPerPage,
  resetDefaultPage,
}: {
  customers: Customer[];
  getCustomers: () => void;
  paginationTotalRows?: number;
  paginationPerPage?: number;
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (rowsPerPage: number) => void;
  resetDefaultPage?: boolean;
}) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<null | Customer>(
    null,
  );
  const [openDelete, setOpenDelete] = useState(false);
  const [openSuspend, setOpenSuspend] = useState(false);
  const [openActivate, setOpenActivate] = useState(false);
  const [recordToBeDeleted, setRecordToBeDeleted] = useState<null | Customer>(
    null,
  );

  const onSuspendCustomer = (customer: Customer) => {
    apiWithToast(updateCustomerStatusAPI(customer.id, "suspended"))
      .then(() => {
        getCustomers();
        setSelectedCustomer(null);
        setOpenSuspend(false);
      })
      .catch((res) => console.log(res.message));
  };

  const onActivateCustomer = (customer: Customer) => {
    apiWithToast(updateCustomerStatusAPI(customer.id, "active"))
      .then(() => {
        getCustomers();
        setSelectedCustomer(null);
        setOpenActivate(false);
      })
      .catch((res) => console.log(res.message));
  };
  const onDeleteCustomer = (customer: Customer) => {
    apiWithToast(deleteCustomerAPI(customer.id))
      .then(() => {
        getCustomers();
        setRecordToBeDeleted(null);
        setOpenDelete(false);
      })
      .catch((res) => console.log(res.message));
  };
  const setupStatus = (row: Customer) => {
    const status = row.status;
    const statusMap: Record<
      CustomerStatus,
      { title: string; status: StatusBadgeType }
    > = {
      active: {
        title: "Active",
        status: "success",
      },
      suspended: {
        title: "Suspended",
        status: "danger",
      },
      deleted: {
        title: "Deleted",
        status: "warning",
      },
    };

    const currentStatus = statusMap[status];

    return StatusBadge(currentStatus);
    //<StatusBadge title={currentStatus.title} status={currentStatus.status} />
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
      name: "Rentals",
      selector: (row) => row.activeRental,
      cell: (row) => <div className="info-color bold">{row.activeRental}</div>,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => setupStatus(row),
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
                setOpenViewModal(true);
              }}
            />
            <RiDeleteBin2Line
              className="link-like"
              onClick={() => {
                setRecordToBeDeleted(row);
                setOpenDelete(true);
              }}
            />
            <TableActionMenu
              items={[
                {
                  label: "Edit",
                  icon: <FiEdit />,
                  onClick: () => {
                    setSelectedCustomer(row);
                    setOpenEditModal(true);
                  },
                },
                row.status === "active" && {
                  label: "Suspend",
                  icon: <FiEdit />,
                  onClick: () => {
                    setSelectedCustomer(row);
                    setOpenSuspend(true);
                  },
                },
                row.status === "suspended" && {
                  label: "Activate",
                  icon: <FiEdit />,
                  onClick: () => {
                    setSelectedCustomer(row);
                    setOpenActivate(true);
                  },
                },
              ]}
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
        paginationTotalRows={paginationTotalRows}
        paginationPerPage={paginationPerPage}
        onChangePage={onChangePage}
        paginationServer
        onChangeRowsPerPage={onChangeRowsPerPage}
        paginationRowsPerPageOptions={defaultPaginationOptions}
        paginationResetDefaultPage={resetDefaultPage}
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
      {openSuspend && selectedCustomer && (
        <ConfirmationModal
          onClose={() => {
            setOpenSuspend(false);
            setSelectedCustomer(null);
          }}
          onConfirm={() => onSuspendCustomer(selectedCustomer)}
          content="Are you sure you want to suspend this customer?"
        />
      )}
      {openActivate && selectedCustomer && (
        <ConfirmationModal
          onClose={() => {
            setOpenActivate(false);
            setSelectedCustomer(null);
          }}
          onConfirm={() => onActivateCustomer(selectedCustomer)}
          content="Are you sure you want to activate this customer?"
        />
      )}
      {openEditModal && selectedCustomer && (
        <EditCustomerModal
          onClose={() => {
            setOpenEditModal(false);
            setSelectedCustomer(null);
          }}
          selectedCustomer={selectedCustomer}
          callBack={() => getCustomers()}
        />
      )}

      {openViewModal && selectedCustomer && (
        <CustomerRentalsModal
          customer={selectedCustomer}
          onClose={() => {
            setOpenViewModal(false);
            setSelectedCustomer(null);
          }}
        />
      )}
    </div>
  );
}
