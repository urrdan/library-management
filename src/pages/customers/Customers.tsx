import { useState } from "react";
import { getCustomersAPI } from "src/api/customersApi";
import ResourcePage from "src/components/resource-page/ResourcePage";
import { useResource } from "src/hooks/useResource";
import CustomerForm from "./CustomerForm";
import CustomersTable from "./CustomersTable";

export default function Customers() {
  const { data: customers, loading, refresh } = useResource(getCustomersAPI);
  const [openModal, setOpenModal] = useState(false);

  return (
    <ResourcePage
      loading={loading}
      newRecordTitle="New Customer"
      onNewRecord={() => setOpenModal(true)}
    >
      <CustomersTable customers={customers} getCustomers={refresh} />
      {openModal && (
        <CustomerForm
          onClose={() => setOpenModal(false)}
          isEditing={false}
          callBack={refresh}
        />
      )}
    </ResourcePage>
  );
}
