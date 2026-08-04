import { useState } from "react";
import { getStaffsAPI } from "src/api/staffApi";
import ResourcePage from "src/components/resource-page/ResourcePage";
import { useResource } from "src/hooks/useResource";
import StaffForm from "./StaffForm";
import StaffsTable from "./StaffTable";

export default function Staff() {
  const { data: staffs, loading, refresh } = useResource(getStaffsAPI);
  const [openModal, setOpenModal] = useState(false);

  return (
    <ResourcePage
      loading={loading}
      newRecordTitle="New Staff"
      onNewRecord={() => setOpenModal(true)}
    >
      <StaffsTable staffs={staffs} getStaffs={refresh} />
      {openModal && (
        <StaffForm
          onClose={() => setOpenModal(false)}
          isEditing={false}
          callBack={refresh}
        />
      )}
    </ResourcePage>
  );
}
