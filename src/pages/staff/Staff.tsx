import { useEffect, useState } from "react";
import StaffsTable from "./StaffTable";
import apiWithToast from "src/api/toastifiedApi";
import { getStaffsAPI } from "src/api/staffApi";
import Loading from "src/components/loading/Loading";
import type { Staff } from "src/types/staffTypes";
import StaffForm from "./StaffForm";
import MyButton from "src/components/MyButton";
import { IoMdAdd } from "react-icons/io";

export default function Staff() {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  function getStaffs() {
    apiWithToast(getStaffsAPI())
      .then((res) => {
        let data = res.data;
        data.map((r) => r);
        console.log(data[0]);
        setStaffs(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getStaffs();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
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
