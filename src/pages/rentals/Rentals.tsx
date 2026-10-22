import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import apiWithToast from "src/api/toastifiedApi";
import Loading from "src/components/loading/Loading";
import MyModal from "src/components/my-modal/MyModal";
import MyButton from "src/components/my-button/MyButton";
import RentalTable from "./RentalTable";
import RentalForm from "./RentalForm";
import { getRentalsAPI } from "src/api/rentalApi";
import type { RentalStatusFilter, RentalView } from "src/types/rentalTypes";
import { DEFAULT_PAGE_SIZE } from "src/utils/constants";
import TableFilter from "src/components/table-filter/TableFilters";
import { useSearchParams } from "react-router-dom";

export default function Rentals() {
  const [searchParams] = useSearchParams();
  const initialStatus =
    (searchParams.get("status") as RentalStatusFilter) || "all";
  const [rentalData, setRentalData] = useState<RentalView[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(true);

  const [openNewRental, setOpenNewRental] = useState(false);

  const [status, setStatus] = useState<RentalStatusFilter>(initialStatus);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [pagination, setPagination] = useState({
    page: page,
    pageSize: pageSize,
    totalRecords: 0,
    totalPages: 0,
  });

  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const resetPagination = () => {
    setPage(1);
    setResetPaginationToggle((prev) => !prev);
  };
  function getRentals() {
    setTableLoading(true);
    apiWithToast(
      getRentalsAPI({
        page,
        pageSize,
        status,
      }),
    )
      .then((res) => {
        setRentalData(res.data);
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
    getRentals();
  }, [page, pageSize, status]);

  return (
    <div>
      {initialLoading ? (
        <Loading />
      ) : (
        <>
          <div className="mb-4 flex justify-between items-center">
            <TableFilter
              value={status}
              onChange={(newStatus: RentalStatusFilter) => {
                setStatus(newStatus);
                resetPagination();
              }}
              filters={[
                { label: "All", value: "all" },
                { label: "Active", value: "active" },
                { label: "Overdue", value: "overdue" },
                { label: "Returned", value: "returned" },
              ]}
            />

            <MyButton
              icon={<IoMdAdd />}
              title="New Rental"
              onClick={() => {
                setOpenNewRental(true);
              }}
            />
          </div>
          <RentalTable
            rentals={rentalData}
            getRentals={getRentals}
            hideColumns={["overdueDays"]}
            paginationTotalRows={pagination.totalRecords}
            paginationPerPage={pageSize}
            tableLoading={tableLoading}
            resetDefaultPage={resetPaginationToggle}
            onChangePage={(page) => {
              setPage(page);
            }}
            onChangeRowsPerPage={(newPageSize) => {
              resetPagination();
              setPageSize(newPageSize);
            }}
          />
          {openNewRental && (
            <MyModal
              onClose={() => {
                setOpenNewRental(false);
              }}
            >
              <RentalForm
                isEditing={false}
                onClose={() => setOpenNewRental(false)}
                getRentals={getRentals}
              />
            </MyModal>
          )}
        </>
      )}
    </div>
  );
}
