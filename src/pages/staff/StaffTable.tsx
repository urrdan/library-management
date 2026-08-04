import DataTable, { type TableColumn } from "react-data-table-component";

import type { Staff } from "src/types/staffTypes";
import { RiDeleteBin2Line } from "react-icons/ri";
import { deleteStaffAPI } from "src/api/staffApi";
import apiWithToast from "src/api/toastifiedApi";
import { useState } from "react";
import ConfirmationModal from "src/components/ConfirmationModal";
import StaffForm from "./StaffForm";
import { BiLinkExternal } from "react-icons/bi";
import { mainPagination } from "src/utils/constants";
import { reportError } from "src/utils/errorUtils";

export default function StaffsTable({
  staffs,
  getStaffs,
}: {
  staffs: Staff[];
  getStaffs: () => void;
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
      .catch((err: unknown) => reportError("deleteStaff", err));
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
      grow: 2,
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <div className="flex justify-around text-2xl">
            <BiLinkExternal
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
    },
  ];

  return (
    <div>
      <DataTable
        data={staffs}
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
