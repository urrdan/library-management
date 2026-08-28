import { useState } from "react";
import { MdClose } from "react-icons/md";

import MyButton from "src/components/my-button/MyButton";
import MyModal, {
  MyModalBody,
  MyModalHead,
} from "src/components/my-modal/MyModal";

import CustomerForm from "./CustomerForm";

import apiWithToast from "src/api/toastifiedApi";
import { updateCustomerAPI } from "src/api/customersApi";

import type { Customer, CustomerProfile } from "src/types/customerTypes";
import fieldsValidation from "src/utils/fieldsValidation";

type EditCustomerModalProps = {
  selectedCustomer: Customer;
  onClose: () => void;
  callBack: () => void;
};

export default function EditCustomerModal({
  selectedCustomer,
  onClose,
  callBack,
}: EditCustomerModalProps) {
  const [stateData, setStateData] = useState<CustomerProfile>({
    firstName: selectedCustomer.firstName,
    lastName: selectedCustomer.lastName,
    email: selectedCustomer.email,
    phone: selectedCustomer.phone,
  });

  const [errorData, setErrorData] = useState<
    Partial<Record<keyof CustomerProfile, boolean>>
  >({});

  const onChange = <K extends keyof CustomerProfile>(
    propName: K,
    value: CustomerProfile[K],
  ) => {
    setStateData((prev) => ({
      ...prev,
      [propName]: value,
    }));
  };

  const onSave = () => {
    const fieldsToValidate: (keyof CustomerProfile)[] = [
      "firstName",
      "lastName",
      "email",
      "phone",
    ];
    const { errorObj, hasError } = fieldsValidation(
      stateData,
      fieldsToValidate,
    );

    setErrorData(errorObj);

    if (hasError) return;

    apiWithToast(updateCustomerAPI(stateData, selectedCustomer.id))
      .then(() => {
        callBack();
        onClose();
      })
      .catch((err) => err);
  };

  return (
    <MyModal onClose={onClose}>
      <MyModalHead>
        <h4>Edit Customer Info</h4>

        <div className="flex">
          <MyButton title="Save" onClick={onSave} />

          <MdClose
            className="ml-2 link-like text-3xl text-gray-500"
            onClick={onClose}
          />
        </div>
      </MyModalHead>

      <MyModalBody>
        <CustomerForm
          data={stateData}
          onChange={onChange}
          errorData={errorData}
        />
      </MyModalBody>
    </MyModal>
  );
}
