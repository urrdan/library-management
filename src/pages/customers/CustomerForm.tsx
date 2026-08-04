import { MdClose } from "react-icons/md";
import MyButton from "../../components/MyButton";
import MyInput from "../../components/MyInput";
import MyModal, { MyModalBody, MyModalHead } from "../../components/MyModal";
import { useState } from "react";
import apiWithToast from "src/api/toastifiedApi";
import { createCustomerAPI, updateCustomerAPI } from "src/api/customersApi";
import type { Customer, CustomerProfile } from "src/types/customerTypes";
import { reportError } from "src/utils/errorUtils";

const customerTemplate = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

type CreateProps = {
  isEditing: false;
  selectedCustomer?: never;
};

type EditProps = {
  isEditing: true;
  selectedCustomer: Customer;
};

type CustomerFormProps = { onClose: () => void; callBack: () => void } & (
  | CreateProps
  | EditProps
);

export default function CustomerForm(props: CustomerFormProps) {
  const fieldsToBeValidated: (keyof CustomerProfile)[] = [
    "firstName",
    "lastName",
    "email",
    "phone",
  ];
  const { isEditing, onClose, callBack, selectedCustomer } = props;

  const [stateData, setStateData] = useState<CustomerProfile>(
    (selectedCustomer && selectedCustomer) || customerTemplate,
  );
  const [errorData, setErrorData] = useState<
    Partial<Record<keyof CustomerProfile, boolean>>
  >({});

  const onChange = <K extends keyof CustomerProfile>(
    propName: K,
    value: CustomerProfile[K],
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
    const { errorObj, hasError } = validateData(stateData, fieldsToBeValidated);
    setErrorData(errorObj);

    if (hasError) return;

    const apiPromise = isEditing
      ? apiWithToast(updateCustomerAPI(stateData, selectedCustomer.id))
      : apiWithToast(createCustomerAPI(stateData));

    apiPromise
      .then(() => {
        callBack();
        onClose();
      })
      .catch((err: unknown) => reportError("saveCustomer", err));
  };

  return (
    <MyModal onClose={onClose}>
      <MyModalHead>
        <div>
          <h4>{isEditing ? "Edit Customer Info" : "Create New Customer"}</h4>
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
            label="Customer Since"
            type="date"
            value={stateData.customerSince}
            onChange={(value) => onChange("customerSince", value)}
            error={errorData.customerSince}
          /> */}
        </div>
      </MyModalBody>
    </MyModal>
  );
}
