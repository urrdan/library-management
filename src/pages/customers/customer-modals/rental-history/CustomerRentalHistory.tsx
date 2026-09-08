import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import MyModal, {
  MyModalBody,
  MyModalHead,
} from "src/components/my-modal/MyModal";
import {
  customerRentalCounts,
  type Customer,
  type CustomerRentalCounts,
} from "src/types/customerTypes";
import type { RentalStatusFilter, RentalView } from "src/types/rentalTypes";
import { getCustomerRentalsAPI } from "src/api/customersApi";
import Loading from "src/components/loading/Loading";
import dateUtil from "src/utils/dateUtil";
import RentalTable from "src/pages/rentals/RentalTable";
import "./customer-rental-history.sass";

type Props = {
  customer: Customer;
  onClose: () => void;
};

export default function CustomerRentalHistory({ customer, onClose }: Props) {
  const [rentals, setRentals] = useState<RentalView[]>([]);

  const [counts, setCounts] =
    useState<CustomerRentalCounts>(customerRentalCounts);
  const [filter, setFilter] = useState<RentalStatusFilter>("all");
  const [initialLoading, setInitialLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);

  useEffect(() => {
    setTableLoading(true);
    getCustomerRentalsAPI(customer.id, filter)
      .then((res) => {
        const { data, counts } = res.data || {};

        data && setRentals(data);
        counts && setCounts(counts);
      })
      .finally(() => {
        initialLoading && setInitialLoading(false);
        setTableLoading(false);
      });
  }, [customer.id, filter]);

  return (
    <MyModal
      onClose={onClose}
      size={initialLoading ? undefined : { width: "800px", height: "100%" }}
    >
      {initialLoading ? (
        <Loading />
      ) : (
        <>
          <MyModalHead>
            <h4>Rental History</h4>

            <MdClose className="link-like" onClick={onClose} />
          </MyModalHead>

          <MyModalBody>
            <div className="history-head">
              <div className="customer-info">
                <div className="initials">
                  {customer.firstName[0]}
                  {customer.lastName[0]}
                </div>

                <div>
                  <h5>
                    {customer.firstName} {customer.lastName}
                  </h5>

                  <p>{customer.email}</p>
                  <p>
                    Member since {dateUtil.readable(customer.customerSince)}
                  </p>
                </div>
              </div>
              <div className="history-filter">
                <button
                  className={filter === "all" ? "selected" : ""}
                  onClick={() => setFilter("all")}
                >
                  <span className="filter-count">{counts.all}</span>
                  <span>All</span>
                </button>

                <i />

                <button
                  className={filter === "active" ? "selected" : ""}
                  onClick={() => setFilter("active")}
                >
                  <span className="filter-count active-count">
                    {counts.active}
                  </span>
                  <span>Active</span>
                </button>

                <i />

                <button
                  className={filter === "overdue" ? "selected" : ""}
                  onClick={() => setFilter("overdue")}
                >
                  <span className="filter-count overdue-count">
                    {counts.overdue}
                  </span>
                  <span>Overdue</span>
                </button>

                <i />

                <button
                  className={filter === "returned" ? "selected" : ""}
                  onClick={() => setFilter("returned")}
                >
                  <span className="filter-count returned-count">
                    {counts.returned}
                  </span>
                  <span>Returned</span>
                </button>
              </div>
            </div>
            <div className="model-table-content">
              {tableLoading ? (
                <Loading />
              ) : (
                <RentalTable
                  rentals={rentals}
                  getRentals={() => {}}
                  hideColumns={["customer", "staff", "overdueDays"]}
                  paginationServer={false}
                />
              )}
            </div>
          </MyModalBody>
        </>
      )}
    </MyModal>
  );
}
