import { useState, type ReactNode } from "react";
import DataTable, { type TableColumn } from "react-data-table-component";
import { BiLinkExternal } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";
import ConfirmationModal from "src/components/my-modal/ConfirmationModal";
import { mainPagination } from "src/utils/constants";

type Props<T> = {
  data: T[];
  columns: TableColumn<T>[];
  /** Adds an edit action to the trailing actions column. */
  onEdit?: (record: T) => void;
  /** Adds a delete action, confirmed through a modal, to the actions column. */
  onDelete?: (record: T) => void;
  editIcon?: ReactNode;
};

/** Paginated table with the actions column and delete confirmation shared by the resources. */
export default function RecordsTable<T>({
  data,
  columns,
  onEdit,
  onDelete,
  editIcon,
}: Props<T>) {
  const [recordToBeDeleted, setRecordToBeDeleted] = useState<T | null>(null);

  const actionsColumn: TableColumn<T> = {
    name: "Actions",
    cell: (row) => (
      <div className="flex text-2xl">
        {onEdit && (
          <span className="link-like mr-3" onClick={() => onEdit(row)}>
            {editIcon ?? <BiLinkExternal />}
          </span>
        )}
        {onDelete && (
          <RiDeleteBin2Line
            className="link-like"
            onClick={() => setRecordToBeDeleted(row)}
          />
        )}
      </div>
    ),
  };

  return (
    <div>
      <DataTable
        data={data}
        columns={onEdit || onDelete ? [...columns, actionsColumn] : columns}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={mainPagination}
      />
      {recordToBeDeleted && (
        <ConfirmationModal
          onClose={() => setRecordToBeDeleted(null)}
          onConfirm={() => {
            onDelete?.(recordToBeDeleted);
            setRecordToBeDeleted(null);
          }}
        />
      )}
    </div>
  );
}
