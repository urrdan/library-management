import apiWithToast from "src/api/toastifiedApi";
import { createStaffAPI, updateStaffAPI } from "src/api/staffApi";
import PersonForm from "src/components/person-form/PersonForm";
import type { Staff } from "src/types/staffTypes";

type CreateProps = {
  isEditing: false;
  selectedStaff?: never;
};

type EditProps = {
  isEditing: true;
  selectedStaff: Staff;
};

type StaffFormProps = { onClose: () => void; callBack: () => void } & (
  CreateProps | EditProps
);

export default function StaffForm({
  isEditing,
  onClose,
  callBack,
  selectedStaff,
}: StaffFormProps) {
  return (
    <PersonForm
      title={isEditing ? "Edit Staff Info" : "Create New Staff"}
      person={selectedStaff}
      onClose={onClose}
      callBack={callBack}
      onSave={(staff) =>
        isEditing
          ? apiWithToast(updateStaffAPI(staff, selectedStaff.id))
          : apiWithToast(createStaffAPI(staff))
      }
    />
  );
}
