import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import MyModal, {
  MyModalBody,
  MyModalHead,
} from "src/components/my-modal/MyModal";
import type { Customer } from "src/types/customerTypes";
import type { RentalView } from "src/types/rentalTypes";
import RentalTable from "../../rentals/RentalTable";
import { getCustomerRentalsAPI } from "src/api/customersApi";
import Loading from "src/components/loading/Loading";

type Props = {
  customer: Customer;
  onClose: () => void;
};

export default function CustomerRentalsModal({ customer, onClose }: Props) {
  const [rentals, setRentals] = useState<RentalView[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCustomerRentalsAPI(customer.id)
      .then((res) => setRentals(res.data))
      .finally(() => setLoading(false));
  }, [customer.id]);

  return (
    <MyModal onClose={onClose}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MyModalHead>
            <h4>Rental History</h4>

            <MdClose className="link-like" onClick={onClose} />
          </MyModalHead>

          <MyModalBody>
            <div>
              <h5 className="text-muted">
                {customer.firstName} {customer.lastName}
              </h5>
            </div>
            <div>
              <button>
                Active: <span>4</span>
              </button>
              <div>
                Overdue: <span>1</span>
              </div>
              <div>
                Returned: <span>7</span>
              </div>
            </div>
            <RentalTable
              rentals={rentals}
              getRentals={() => {}}
              hideColumns={["customer", "staff"]}
            />
          </MyModalBody>
        </>
      )}
    </MyModal>
  );
}
