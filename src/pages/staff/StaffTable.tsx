import DataTable, { type TableColumn } from "react-data-table-component";

import type { Staff } from "src/types/staffTypes";
import { RiDeleteBin2Line } from "react-icons/ri";
import { deleteStaffAPI } from "src/api/staffApi";
import apiWithToast from "src/api/toastifiedApi";
import { useState } from "react";
import ConfirmationModal from "src/components/my-modal/ConfirmationModal";
import StaffForm from "./StaffForm";
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGINATION_OPTIONS,
} from "src/utils/constants";
import { FiEdit } from "react-icons/fi";
import Loading from "src/components/loading/Loading";
import type { StatusBadgeType } from "src/components/status-badge/StatusBadge";
import StatusBadge from "src/components/status-badge/StatusBadge";

export default function StaffsTable({
  staffs,
  getStaffs,
  paginationTotalRows,
  paginationPerPage = DEFAULT_PAGE_SIZE,
  onChangePage,
  onChangeRowsPerPage,
  resetDefaultPage,
  tableLoading,
}: {
  staffs: Staff[];
  getStaffs: () => void;

  paginationTotalRows?: number;
  paginationPerPage?: number;
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (rowsPerPage: number) => void;
  resetDefaultPage?: boolean;
  tableLoading?: boolean;
}) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<null | Staff>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [recordToBeDeleted, setRecordToBeDeleted] = useState<null | Staff>(
    null,
  );

  const onDeleteStaff = (staff: Staff) => {
    apiWithToast(deleteStaffAPI(staff.id))
      .then(() => {
        getStaffs();
        setRecordToBeDeleted(null);
        setOpenDelete(false);
      })
      .catch((res) => console.log(res.message));
  };

  const customeStyles = {
    progress: {
      style: {
        backgroundColor: "transparent",
      },
    },
  };

  const setupStatus = (row: Staff) => {
    const status = row.role;
    const statusMap: Record<
      Staff["role"],
      { title: string; status: StatusBadgeType }
    > = {
      admin: {
        title: "Admin",
        status: "success",
      },
      librarian: {
        title: "Librarian",
        status: "info",
      },
    };

    const currentStatus = statusMap[status];

    return StatusBadge(currentStatus);
  };
  const columns: TableColumn<Staff>[] = [
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
      grow: 3,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      cell: (row) => setupStatus(row),
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <div className="flex justify-around text-2xl">
            <FiEdit
              className="link-like mr-3"
              onClick={() => {
                setSelectedStaff(row);
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
      right: true,
    },
  ];

  return (
    <div>
      <DataTable
        data={staffs}
        columns={columns}
        pagination
        paginationTotalRows={paginationTotalRows}
        paginationPerPage={paginationPerPage}
        onChangePage={onChangePage}
        paginationServer
        onChangeRowsPerPage={onChangeRowsPerPage}
        paginationRowsPerPageOptions={DEFAULT_PAGINATION_OPTIONS}
        paginationResetDefaultPage={resetDefaultPage}
        progressPending={tableLoading}
        progressComponent={<Loading />}
        customStyles={customeStyles}
      />
      {openDelete && recordToBeDeleted && (
        <ConfirmationModal
          onClose={() => {
            setOpenDelete(false);
            setRecordToBeDeleted(null);
          }}
          onConfirm={() => onDeleteStaff(recordToBeDeleted)}
        />
      )}
      {openEditModal && selectedStaff && (
        <StaffForm
          onClose={() => {
            setOpenEditModal(false);
            setSelectedStaff(null);
          }}
          selectedStaff={selectedStaff}
          isEditing
          callBack={() => getStaffs()}
        />
      )}
    </div>
  );
}
