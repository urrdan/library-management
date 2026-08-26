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
import RentalTableFilter from "./rental-filter/RentalFilter";
import { defaultPageSize } from "src/utils/constants";

export default function Rentals() {
  const [rentalData, setRentalData] = useState<RentalView[]>([]);
  const [loading, setLoading] = useState(true);

  const [openNewRental, setOpenNewRental] = useState(false);

  const [status, setStatus] = useState<RentalStatusFilter>("all");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [pagination, setPagination] = useState({
    page: page,
    pageSize: pageSize,
    totalRecords: 0,
    totalPages: 0,
  });

  function getRentals() {
    apiWithToast(
      getRentalsAPI({
        page,
        pageSize,
        status,
      }),
    )
      .then((res) => {
        setRentalData(res.data);
        setLoading(false);
        if (res.pagination) {
          setPagination(res.pagination);
        }
      })
      .catch((err) => console.log(err));
  }
  const onStatusChange = (newStatus: RentalStatusFilter) => {
    setStatus(newStatus);
    setPage(1);
  };

  useEffect(() => {
    getRentals();
  }, [page, pageSize, status]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="mb-4 flex justify-between items-center">
            <RentalTableFilter value={status} onChange={onStatusChange} />

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
            onChangePage={(page) => {
              console.log(page);
              setPage(page);
            }}
            onChangeRowsPerPage={(newPageSize) => {
              console.log(newPageSize);
              setPageSize(newPageSize);
              setPage(1);
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
