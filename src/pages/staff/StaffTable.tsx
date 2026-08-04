import { useState } from "react";
import type { TableColumn } from "react-data-table-component";
import { deleteStaffAPI } from "src/api/staffApi";
import apiWithToast from "src/api/toastifiedApi";
import RecordsTable from "src/components/records-table/RecordsTable";
import { personColumns } from "src/components/records-table/personColumns";
import type { Staff } from "src/types/staffTypes";
import StaffForm from "./StaffForm";

export default function StaffsTable({
  staffs,
  getStaffs,
}: {
  staffs: Staff[];
  getStaffs: () => void;
}) {
  const [selectedStaff, setSelectedStaff] = useState<null | Staff>(null);

  const onDeleteStaff = (staff: Staff) => {
    apiWithToast(deleteStaffAPI(staff.id))
      .then(() => getStaffs())
      .catch((res) => console.log(res.message));
  };

  const columns: TableColumn<Staff>[] = [
    ...personColumns<Staff>(),
    {
      name: "Role",
      selector: (row) => row.role,
    },
  ];

  return (
    <>
      <RecordsTable
        data={staffs}
        columns={columns}
        onEdit={setSelectedStaff}
        onDelete={onDeleteStaff}
      />
      {selectedStaff && (
        <StaffForm
          onClose={() => setSelectedStaff(null)}
          selectedStaff={selectedStaff}
          isEditing
          callBack={getStaffs}
        />
      )}
    </>
  );
}
