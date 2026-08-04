import { useState } from "react";
import type { TableColumn } from "react-data-table-component";
import { deleteRentalAPI } from "src/api/rentalApi";
import apiWithToast from "src/api/toastifiedApi";
import MyModal from "src/components/my-modal/MyModal";
import RecordsTable from "src/components/records-table/RecordsTable";
import type { Rental } from "src/types/rentalTypes";
import RentalForm from "./RentalForm";

export default function RentalTable({
  rentals,
  getRentals,
}: {
  rentals: Rental[];
  getRentals: () => void;
}) {
  const [editingData, setEditingData] = useState<Rental | null>(null);

  const onDeleting = (record: Rental) => {
    apiWithToast(deleteRentalAPI(record.id))
      .then(() => getRentals())
      .catch((res) => console.log(res.message));
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
      name: "Due Date",
      selector: (row) => row.dueDate,
      sortable: true,
      grow: 2,
    },
    {
      name: "Status",
      cell: (row) => <div>{row.returnedDate ? "Returned" : "Rented"}</div>,
      sortable: true,
    },
  ];

  return (
    <>
      <RecordsTable
        data={rentals}
        columns={columns}
        onEdit={setEditingData}
        onDelete={onDeleting}
      />
      {editingData && (
        <MyModal onClose={() => setEditingData(null)}>
          <RentalForm
            isEditing
            editingRecord={editingData}
            getRentals={getRentals}
            onClose={() => setEditingData(null)}
          />
        </MyModal>
      )}
    </>
  );
}
