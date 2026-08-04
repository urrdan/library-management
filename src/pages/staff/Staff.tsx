import { useEffect, useState } from "react";
import StaffsTable from "./StaffTable";
import apiWithToast from "src/api/toastifiedApi";
import { getStaffsAPI } from "src/api/staffApi";
import Loading from "src/components/loading/Loading";
import type { Staff } from "src/types/staffTypes";
import StaffForm from "./StaffForm";
import MyButton from "src/components/MyButton";
import { IoMdAdd } from "react-icons/io";
import ErrorState from "src/components/error-state/ErrorState";
import { getErrorMessage, reportError } from "src/utils/errorUtils";

export default function Staff() {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  function getStaffs() {
    setLoading(true);
    setLoadError(null);
    apiWithToast(getStaffsAPI())
      .then((res) => setStaffs(res.data))
      .catch((err: unknown) => {
        reportError("getStaffs", err);
        setLoadError(getErrorMessage(err));
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getStaffs();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : loadError ? (
        <ErrorState message={loadError} onRetry={getStaffs} />
      ) : (
        <>
          <div className="mb-4 flex justify-end ">
            <div></div>
            <MyButton
              icon={<IoMdAdd />}
              title="New Staff"
              onClick={() => {
                setOpenModal(true);
              }}
            />
          </div>
          <StaffsTable staffs={staffs} getStaffs={getStaffs} />
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
