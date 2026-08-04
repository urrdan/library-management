import { useState } from "react";
import { MdClose } from "react-icons/md";
import MyButton from "src/components/my-button/MyButton";
import MyInput from "src/components/my-input/MyInput";
import MyModal, {
  MyModalBody,
  MyModalHead,
} from "src/components/my-modal/MyModal";
import type { SuccessResponse } from "src/types/apiTypes";
import formValidation from "src/utils/formValidation";

export type PersonProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const personTemplate: PersonProfile = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

const fieldsToBeValidated: (keyof PersonProfile)[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
];

type Props = {
  title: string;
  person?: PersonProfile;
  onClose: () => void;
  callBack: () => void;
  onSave: (person: PersonProfile) => Promise<SuccessResponse<string>>;
};

/** Contact details form shared by the staff and the customer pages. */
export default function PersonForm({
  title,
  person,
  onClose,
  callBack,
  onSave,
}: Props) {
  const [stateData, setStateData] = useState<PersonProfile>(
    person || personTemplate,
  );
  const [errorData, setErrorData] = useState<
    Partial<Record<keyof PersonProfile, boolean>>
  >({});

  const onChange = <K extends keyof PersonProfile>(
    propName: K,
    value: PersonProfile[K],
  ) => {
    setStateData((prev) => ({ ...prev, [propName]: value }));
  };

  const onSubmit = () => {
    const { errorObj, hasError } = formValidation(
      stateData,
      fieldsToBeValidated,
    );
    setErrorData(errorObj);
    if (hasError) return;

    onSave(stateData)
      .then(() => {
        callBack();
        onClose();
      })
      .catch((err) => err);
  };

  return (
    <MyModal onClose={onClose}>
      <MyModalHead>
        <div>
          <h4>{title}</h4>
        </div>
        <div className="flex">
          <MyButton title="Save" onClick={onSubmit} />
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
            onChange={(value) => onChange("firstName", value)}
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
            onChange={(value) => onChange("phone", value)}
            error={errorData.phone}
          />
          <MyInput
            label="Email"
            value={stateData.email}
            onChange={(value) => onChange("email", value)}
            error={errorData.email}
          />
        </div>
      </MyModalBody>
    </MyModal>
  );
}
