import { useEffect, useState } from "react";
import StaffsTable from "./StaffTable";
import apiWithToast from "src/api/toastifiedApi";
import { getStaffsAPI } from "src/api/staffApi";
import Loading from "src/components/loading/Loading";
import type { Staff, StaffStatusFilter } from "src/types/staffTypes";
import StaffForm from "./StaffForm";
import MyButton from "src/components/my-button/MyButton";
import { IoMdAdd } from "react-icons/io";
import { DEFAULT_PAGE_SIZE } from "src/utils/constants";
import TableFilter from "src/components/table-filter/TableFilters";

export default function Staff() {
  const [staffs, setStaffs] = useState<Staff[]>([]);

  const [status, setStatus] = useState<StaffStatusFilter>("all");
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
  const [openModal, setOpenModal] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(true);

  function getStaffs() {
    setTableLoading(true);
    apiWithToast(getStaffsAPI({ page, pageSize, status }))
      .then((res) => {
        setStaffs(res.data);
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
    getStaffs();
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
              onChange={(status: StaffStatusFilter) => {
                setStatus(status);
                resetPagination();
              }}
              filters={[
                { label: "All", value: "all" },
                { label: "Librarian", value: "librarian" },
                { label: "Admin", value: "admin" },
              ]}
            />
            <MyButton
              icon={<IoMdAdd />}
              title="New Staff"
              onClick={() => {
                setOpenModal(true);
              }}
            />
          </div>

          <StaffsTable
            staffs={staffs}
            getStaffs={getStaffs}
            paginationTotalRows={pagination.totalRecords}
            paginationPerPage={pageSize}
            onChangePage={(page) => {
              setPage(page);
            }}
            onChangeRowsPerPage={(newPageSize) => {
              setPageSize(newPageSize);
              resetPagination();
            }}
            resetDefaultPage={resetPaginationToggle}
            tableLoading={tableLoading}
          />
          {openModal && (
            <StaffForm
              onClose={() => {
                setOpenModal(false);
              }}
              isEditing={false}
              callBack={() => getStaffs()}
            />
          )}
        </>
      )}
    </>
  );
}
