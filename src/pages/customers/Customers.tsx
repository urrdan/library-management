import { useEffect, useState } from "react";
import apiWithToast from "src/api/toastifiedApi";
import { getCustomersAPI } from "src/api/customersApi";
import Loading from "src/components/loading/Loading";
import type { Customer, CustomerStatusFilter } from "src/types/customerTypes";
import MyButton from "src/components/my-button/MyButton";
import { IoMdAdd } from "react-icons/io";
import CustomersTable from "./CustomersTable";
import CreateCustomerModal from "./customer-modals/CreateCustomerModal";
import { DEFAULT_PAGE_SIZE } from "src/utils/constants";
import TableFilter from "src/components/table-filter/TableFilters";

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [status, setStatus] = useState<CustomerStatusFilter>("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [pagination, setPagination] = useState({
    page: page,
    pageSize: pageSize,
    totalRecords: 0,
    totalPages: 0,
  });

  const [openModal, setOpenModal] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const resetPagination = () => {
    setPage(1);
    setResetPaginationToggle((prev) => !prev);
  };

  function getCustomers() {
    setTableLoading(true);
    apiWithToast(getCustomersAPI({ page, pageSize, status }))
      .then((res) => {
        let data = res.data;
        data.map((r) => r);
        setCustomers(res.data);
        if (res.pagination) {
          setPagination(res.pagination);
        }
      })
      .finally(() => {
        setInitialLoading(false);
        setTableLoading(false);
      });
  }

  useEffect(() => {
    getCustomers();
  }, [page, pageSize, status]);
  return (
    <>
      {initialLoading ? (
        <Loading />
      ) : (
        <>
          <div className="mb-4 flex justify-between items-center gap-4">
            <TableFilter
              value={status}
              onChange={(status: CustomerStatusFilter) => {
                setStatus(status);
                resetPagination();
              }}
              filters={[
                { label: "All", value: "all" },
                { label: "Active", value: "active" },
                { label: "Suspended", value: "suspended" },
              ]}
            />
            <MyButton
              icon={<IoMdAdd />}
              title="New Customer"
              onClick={() => {
                setOpenModal(true);
              }}
            />
          </div>
          <CustomersTable
            customers={customers}
            getCustomers={getCustomers}
            paginationTotalRows={pagination.totalRecords}
            paginationPerPage={pageSize}
            tableLoading={tableLoading}
            onChangePage={(page) => {
              setPage(page);
            }}
            onChangeRowsPerPage={(newPageSize) => {
              setPageSize(newPageSize);
              resetPagination();
            }}
            resetDefaultPage={resetPaginationToggle}
          />
          {openModal && (
            <>
              <CreateCustomerModal
                onClose={() => {
                  setOpenModal(false);
                }}
                callBack={() => getCustomers()}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
