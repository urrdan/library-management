import apiWithToast from "src/api/toastifiedApi";
import { createCustomerAPI, updateCustomerAPI } from "src/api/customersApi";
import PersonForm from "src/components/person-form/PersonForm";
import type { Customer } from "src/types/customerTypes";

type CreateProps = {
  isEditing: false;
  selectedCustomer?: never;
};

type EditProps = {
  isEditing: true;
  selectedCustomer: Customer;
};

type CustomerFormProps = { onClose: () => void; callBack: () => void } & (
  CreateProps | EditProps
);

export default function CustomerForm({
  isEditing,
  onClose,
  callBack,
  selectedCustomer,
}: CustomerFormProps) {
  return (
    <PersonForm
      title={isEditing ? "Edit Customer Info" : "Create New Customer"}
      person={selectedCustomer}
      onClose={onClose}
      callBack={callBack}
      onSave={(customer) =>
        isEditing
          ? apiWithToast(updateCustomerAPI(customer, selectedCustomer.id))
          : apiWithToast(createCustomerAPI(customer))
      }
    />
  );
}
