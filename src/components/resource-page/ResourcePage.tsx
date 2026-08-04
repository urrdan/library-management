import { IoMdAdd } from "react-icons/io";
import { MdRefresh } from "react-icons/md";
import type { ReactNode } from "react";
import Loading from "src/components/loading/Loading";
import MyButton from "src/components/my-button/MyButton";

type Props = {
  loading: boolean;
  newRecordTitle: string;
  onNewRecord: () => void;
  onRefresh?: () => void;
  children: ReactNode;
};

/** Loading state, "new record" header and body shared by the list pages. */
export default function ResourcePage({
  loading,
  newRecordTitle,
  onNewRecord,
  onRefresh,
  children,
}: Props) {
  if (loading) return <Loading />;

  return (
    <div>
      <div className="mb-4 flex justify-end">
        {onRefresh && (
          <MyButton
            icon={<MdRefresh />}
            title="Refresh"
            className="mr-2"
            onClick={onRefresh}
          />
        )}
        <MyButton
          icon={<IoMdAdd />}
          title={newRecordTitle}
          onClick={onNewRecord}
        />
      </div>
      {children}
    </div>
  );
}
