import { MdClose } from "react-icons/md";
import MyButton from "../../components/MyButton";
import MyInput from "../../components/MyInput";
import MyModal, { MyModalBody, MyModalHead } from "../../components/MyModal";
import { useState } from "react";
import apiWithToast from "src/api/toastifiedApi";
import { createStaffAPI, updateStaffAPI } from "src/api/staffApi";
import type { Staff, StaffProfile } from "src/types/staffTypes";

const staffTemplate = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

type CreateProps = {
  isEditing: false;
  selectedStaff?: never;
};

type EditProps = {
  isEditing: true;
  selectedStaff: Staff;
};

type StaffFormProps = { onClose: () => void; callBack: () => void } & (
  | CreateProps
  | EditProps
);

export default function StaffForm(props: StaffFormProps) {
  const fieldsToBeValidated: (keyof StaffProfile)[] = [
    "firstName",
    "lastName",
    "email",
    "phone",
  ];
  const { isEditing, onClose, callBack, selectedStaff } = props;

  const [stateData, setStateData] = useState<StaffProfile>(
    (selectedStaff && selectedStaff) || staffTemplate,
  );
  const [errorData, setErrorData] = useState<
    Partial<Record<keyof StaffProfile, boolean>>
  >({});

  const onChange = <K extends keyof StaffProfile>(
    propName: K,
    value: StaffProfile[K],
  ) => {
    setStateData((prev) => ({ ...prev, [propName]: value }));
  };

  function validateData<T>(
    data: T, //object to be validated
    fieldsToValidate: (keyof T)[], //prop names
  ) {
    const result: Partial<Record<keyof T, boolean>> = {};
    fieldsToValidate.forEach((x) => {
      if (!data[x] && data[x] !== 0) result[x] = true;
    });
    return {
      errorObj: result,
      hasError: Object.values(result).some((x) => x == true),
    };
  }
  const onSave = () => {
    console.log(stateData);
    const { errorObj, hasError } = validateData(stateData, fieldsToBeValidated);
    setErrorData(errorObj);

    if (hasError) return;

    const apiPromise = isEditing
      ? apiWithToast(updateStaffAPI(stateData, selectedStaff.id))
      : apiWithToast(createStaffAPI(stateData));

    apiPromise
      .then((res) => {
        res;
        callBack();
        onClose();
      })
      .catch((err) => err);
  };

  return (
    <MyModal onClose={onClose}>
      <MyModalHead>
        <div>
          <h4>{isEditing ? "Edit Staff Info" : "Create New Staff"}</h4>
        </div>
        <div className="flex">
          <MyButton title="Save" onClick={onSave} />
          <MdClose
            className="ml-2 link-like text-3xl text-gray-500"
            onClick={onClose}
          />
        </div>
      </MyModalHead>

      <MyModalBody>
        <div className="grid grid-cols-2 gap-4 gap-x-6">
          <MyInput
            label="First Name"
            value={stateData.firstName}
            onChange={(value) => {
              onChange("firstName", value);
            }}
            error={errorData.firstName}
          />
          <MyInput
            label="Last Name"
            value={stateData.lastName}
            onChange={(value) => onChange("lastName", value)}
            error={errorData.lastName}
          />
          <MyInput
            label="Phone"
            value={stateData.phone}
            onChange={(value) => {
              onChange("phone", value);
            }}
            error={errorData.phone}
          />

          <MyInput
            label="Email"
            value={stateData.email}
            onChange={(value) => {
              onChange("email", value);
            }}
            error={errorData.email}
          />

          {/* <MyInput
            label="Staff Since"
            type="date"
            value={stateData.staffSince}
            onChange={(value) => onChange("staffSince", value)}
            error={errorData.staffSince}
          />
          <MyInput
            label="Role"
            value={stateData.role}
            onChange={(value) => onChange("role", value)}
            error={errorData.role}
          /> */}
        </div>
      </MyModalBody>
    </MyModal>
  );
}
