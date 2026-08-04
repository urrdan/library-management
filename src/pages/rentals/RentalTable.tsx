import DataTable, { type TableColumn } from "react-data-table-component";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BiLinkExternal } from "react-icons/bi";
import { useState } from "react";
import ConfirmationModal from "src/components/ConfirmationModal";
import RentalForm from "./RentalForm";
import MyModal from "src/components/MyModal";
import apiWithToast from "src/api/toastifiedApi";
import { deleteApi } from "src/api/mockAPI";
import type { Rental } from "src/types/types";
import { reportError } from "src/utils/errorUtils";
export default function RentalTable({
  rentals,
  getRentals,
}: {
  rentals: Rental[];
  getRentals: () => void;
}) {
  const [openEditRental, setOpenEditRental] = useState(false);
  const [editingData, setEditingData] = useState<Rental | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [recordToBeDeleted, setRecordToBeDeleted] = useState<null | Rental>(
    null,
  );
  const onDeleting = (record: Rental) => {
    apiWithToast(deleteApi("/rentals", record.id))
      .then(() => {
        getRentals();
        setRecordToBeDeleted(null);
        setOpenDelete(false);
      })
      .catch((err: unknown) => reportError("deleteRental", err));
  };
  const columns: TableColumn<Rental>[] = [
    {
      name: "Book Title",
      selector: (row) => row.bookTitle,
      sortable: true,
      grow: 4,
    },
    {
      name: "Customer",
      selector: (row) => row.customerName,
      sortable: true,
      grow: 3,
    },
    {
      name: "Rented Date",
      selector: (row) => row.rentedDate,
      sortable: true,
      grow: 2,
    },
    {
      name: "Return Date",
      selector: (row) => row.returnDate,
      sortable: true,
      grow: 2,
    },
    {
      name: "Status",
      cell: (row) => <div>{row.returnDate && "Overdue"}</div>,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (record: Rental) => {
        return (
          <div className="flex text-2xl">
            <BiLinkExternal
              className=" link-like mr-2"
              onClick={() => {
                setEditingData(record);
                setOpenEditRental(true);
              }}
            />
            <MdOutlineDeleteForever
              className=" link-like"
              onClick={() => {
                setRecordToBeDeleted(record);
                setOpenDelete(true);
              }}
            />
          </div>
        );
      },
      sortable: true,
    },
  ];

  return (
    <div>
      <DataTable
        data={rentals}
        columns={columns}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 50, 100]}
      />
      {openDelete && recordToBeDeleted && (
        <ConfirmationModal
          onClose={() => {
            setOpenDelete(false);
            setRecordToBeDeleted(null);
          }}
          onConfirm={() => onDeleting(recordToBeDeleted)}
        />
      )}
      {openEditRental && editingData && (
        <MyModal
          onClose={() => {
            setOpenEditRental(false);
          }}
        >
          <RentalForm
            isEditing
            editingRecord={editingData}
            getRentals={getRentals}
            onClose={() => {
              setOpenEditRental(false);
              setEditingData(null);
            }}
          />
        </MyModal>
      )}
    </div>
  );
}
