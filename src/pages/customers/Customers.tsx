import { useEffect, useState } from "react";
import apiWithToast from "src/api/toastifiedApi";
import { getCustomersAPI } from "src/api/customersApi";
import Loading from "src/components/loading/Loading";
import type { Customer } from "src/types/customerTypes";
import CustomerForm from "./CustomerForm";
import MyButton from "src/components/MyButton";
import { IoMdAdd } from "react-icons/io";
import CustomersTable from "./CustomersTable";
import ErrorState from "src/components/error-state/ErrorState";
import { getErrorMessage, reportError } from "src/utils/errorUtils";

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  function getCustomers() {
    setLoading(true);
    setLoadError(null);
    apiWithToast(getCustomersAPI())
      .then((res) => setCustomers(res.data))
      .catch((err: unknown) => {
        reportError("getCustomers", err);
        setLoadError(getErrorMessage(err));
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getCustomers();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : loadError ? (
        <ErrorState message={loadError} onRetry={getCustomers} />
      ) : (
        <>
          <div className="mb-4 flex justify-end ">
            <div></div>
            <MyButton
              icon={<IoMdAdd />}
              title="New Customer"
              onClick={() => {
                setOpenModal(true);
              }}
            />
          </div>
          <CustomersTable customers={customers} getCustomers={getCustomers} />
          {openModal && (
            <CustomerForm
              onClose={() => {
                setOpenModal(false);
              }}
              isEditing={false}
              callBack={() => getCustomers()}
            />
          )}
        </>
      )}
    </>
  );
}
