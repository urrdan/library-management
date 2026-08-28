import { MdClose } from "react-icons/md";

import MyModal, {
  MyModalBody,
  MyModalHead,
} from "src/components/my-modal/MyModal";

import CustomerForm from "./CustomerForm";

import type { Customer } from "src/types/customerTypes";

export default function ViewCustomerModal({
  selectedCustomer,
  onClose,
}: {
  selectedCustomer: Customer;
  onClose: () => void;
}) {
  return (
    <MyModal onClose={onClose}>
      <MyModalHead>
        <h4>Customer Info</h4>

        <MdClose
          className="link-like text-3xl text-gray-500"
          onClick={onClose}
        />
      </MyModalHead>

      <MyModalBody>
        <CustomerForm data={selectedCustomer} disabled />
      </MyModalBody>
    </MyModal>
  );
}
