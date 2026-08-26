//rental table
import DataTable, { type TableColumn } from "react-data-table-component";
import { BiLinkExternal } from "react-icons/bi";
import { useState } from "react";
import ConfirmationModal from "src/components/my-modal/ConfirmationModal";
import RentalForm from "./RentalForm";
import MyModal from "src/components/my-modal/MyModal";
import apiWithToast from "src/api/toastifiedApi";
import { deleteRentalAPI, undoReturnRentalAPI } from "src/api/rentalApi";
import type { RentalStatus, RentalView } from "src/types/rentalTypes";
import dateUtil from "src/utils/dateUtil";
import StatusBadge, {
  type StatusBadgeType,
} from "src/components/status-badge/StatusBadge";
import { RiDeleteBin2Line } from "react-icons/ri";
import TableActionMenu from "src/components/table-action-menu/TableActionMenu";
import ReturnRental from "./ReturnRental";
import { CgUndo } from "react-icons/cg";
import { MdUndo } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { defaultPaginationOptions } from "src/utils/constants";

export const COLUMN_IDS = [
  "book",
  "customer",
  "staff",
  "rentedDate",
  "dueDate",
  "overdueDays",
  "status",
  "actions",
] as const;

export type RentalColumnId = (typeof COLUMN_IDS)[number];

type RentalTableColumn = TableColumn<RentalView> & {
  id: RentalColumnId;
};

type RentalTableProps = {
  pagination?: boolean;
  rentals: RentalView[];
  getRentals: () => void;
  isCompact?: boolean;
  paginationTotalRows?: number;
  paginationPerPage?: number;
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (rowsPerPage: number) => void;
} & (
  | {
      hideColumns?: RentalColumnId[];
      showColumns?: never;
    }
  | {
      showColumns?: RentalColumnId[];
      hideColumns?: never;
    }
);

export default function RentalTable({
  rentals,
  getRentals,
  isCompact = false,
  hideColumns,
  showColumns,
  pagination = true,
  paginationTotalRows,
  paginationPerPage = 10,
  onChangePage,
  onChangeRowsPerPage,
}: RentalTableProps) {
  const [openEditRental, setOpenEditRental] = useState(false);
  const [openViewRental, setOpenViewRental] = useState(false);
  const [editingData, setEditingData] = useState<RentalView | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUndoReturn, setOpeningUndoReturnModal] = useState(false);
  const [recordToBeDeleted, setRecordToBeDeleted] = useState<RentalView | null>(
    null,
  );
  const [openingReturnModal, setOpeningReturnModal] = useState(false);

  const onDeleting = (record: RentalView) => {
    apiWithToast(deleteRentalAPI(record.id)).then(() => {
      getRentals();
      setRecordToBeDeleted(null);
      setOpenDelete(false);
    });
  };

  const onUndoReturn = (record: RentalView) => {
    apiWithToast(undoReturnRentalAPI(record.id)).then(() => {
      getRentals();
      setRecordToBeDeleted(null);
      setOpeningUndoReturnModal(false);
    });
  };

  const setupStatus = (row: RentalView) => {
    const status = row.status;
    const statusMap: Record<
      RentalStatus,
      { title: string; status: StatusBadgeType }
    > = {
      returned: {
        title: "Returned",
        status: "success",
      },
      overdue: {
        title: "Overdue",
        status: "danger",
      },
      active: {
        title: "active",
        status: "info",
      },
    };

    const currentStatus = statusMap[status];

    return (
      <StatusBadge title={currentStatus.title} status={currentStatus.status} />
    );
  };

  const columns: RentalTableColumn[] = [
    {
      id: "book",
      name: "Book",
      selector: (row) => row.bookTitle,
      sortable: true,
      grow: 4,
    },
    {
      id: "customer",
      name: "Customer",
      selector: (row) => row.customerName,
      sortable: true,
      grow: 3,
    },
    {
      id: "staff",
      name: "Staff",
      selector: (row) => row.staffName,
      sortable: true,
      grow: 3,
    },
    {
      id: "rentedDate",
      name: "Rented",
      selector: (row) => row.rentedDate,
      cell: (row) => (
        <div title={dateUtil.readable(row.rentedDate)}>
          {isCompact
            ? dateUtil.short(row.rentedDate)
            : dateUtil.readable(row.rentedDate)}
        </div>
      ),
      sortable: true,
      grow: 2,
    },
    {
      id: "dueDate",
      name: "Due",
      selector: (row) => row.dueDate,
      cell: (row) => (
        <div title={dateUtil.readable(row.dueDate)}>
          {isCompact
            ? dateUtil.short(row.dueDate)
            : dateUtil.readable(row.dueDate)}
        </div>
      ),
      sortable: true,
      grow: 2,
    },
    {
      id: "overdueDays",
      name: "Days",

      cell: (row) => {
        let days = 0;
        if (row.returnedDate) days = 0;
        else
          days = Math.max(
            0,
            dateUtil.differenceInDays(dateUtil.today(), row.dueDate),
          );
        return <div className="danger-color font-bold">{days}</div>;
      },
      minWidth: "60px",
    },
    {
      id: "status",
      name: "Status",
      cell: (row) => <div>{setupStatus(row)}</div>,
      sortable: true,
      minWidth: "114px",
    },
    {
      id: "actions",
      name: "Actions",
      cell: (record: RentalView) => {
        const status = record.status;

        return (
          <div className="flex text-2xl table-actions">
            <BiLinkExternal
              className="link-like"
              onClick={() => {
                setEditingData(record);
                setOpenViewRental(true);
              }}
            />

            <TableActionMenu
              items={[
                status !== "returned" && {
                  label: "Return Book",
                  icon: <MdUndo />,
                  onClick: () => {
                    setOpeningReturnModal(true);
                    setEditingData(record);
                  },
                },
                status === "returned" && {
                  label: "Undo Return",
                  icon: <CgUndo />,
                  onClick: () => {
                    setOpeningUndoReturnModal(true);
                    setEditingData(record);
                  },
                },
                {
                  label: "Admin Edit",
                  icon: <FiEdit />,
                  onClick: () => {
                    setEditingData(record);
                    setOpenEditRental(true);
                  },
                },
                {
                  label: "Admin Delete",
                  icon: <RiDeleteBin2Line />,
                  onClick: () => {
                    setRecordToBeDeleted(record);
                    setOpenDelete(true);
                  },
                },
              ]}
            />
          </div>
        );
      },
      sortable: true,
    },
  ];

  const filteredColumns = (() => {
    if (showColumns) {
      return columns.filter((column) => showColumns.includes(column.id));
    }

    if (hideColumns) {
      return columns.filter((column) => !hideColumns.includes(column.id));
    }

    return columns;
  })();

  return (
    <div className="my-table">
      <DataTable
        data={rentals}
        columns={filteredColumns}
        pagination={pagination}
        paginationTotalRows={paginationTotalRows}
        paginationPerPage={paginationPerPage}
        onChangePage={onChangePage}
        paginationServer
        onChangeRowsPerPage={onChangeRowsPerPage}
        paginationRowsPerPageOptions={defaultPaginationOptions}
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

      {openUndoReturn && recordToBeDeleted && (
        <ConfirmationModal
          onClose={() => {
            setOpeningUndoReturnModal(false);
            setRecordToBeDeleted(null);
          }}
          onConfirm={() => onUndoReturn(recordToBeDeleted)}
        />
      )}

      {openViewRental && editingData && (
        <MyModal
          onClose={() => {
            setOpenViewRental(false);
          }}
        >
          <RentalForm
            isViewing
            editingRecord={editingData}
            getRentals={getRentals}
            onClose={() => {
              setOpenViewRental(false);
              setEditingData(null);
            }}
          />
        </MyModal>
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
            rentalId={editingData.id}
            getRentals={getRentals}
            onClose={() => {
              setOpenEditRental(false);
              setEditingData(null);
            }}
          />
        </MyModal>
      )}

      {openingReturnModal && editingData && (
        <MyModal
          onClose={() => {
            setOpeningReturnModal(false);
            setEditingData(null);
          }}
        >
          <ReturnRental
            onClose={() => {
              setOpeningReturnModal(false);
              setEditingData(null);
            }}
            rentalId={editingData.id}
            getRentals={getRentals}
          />
        </MyModal>
      )}
    </div>
  );
}
