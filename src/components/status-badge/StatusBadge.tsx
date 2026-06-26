import "./StatusBadge.sass";
type StatusBadge = "success" | "info" | "warning" | "danger";
export default function ({
  title,
  status,
}: {
  title: string;
  status: StatusBadge;
}) {
  return <div className={`my-badge my-badge-${status}`}>{title}</div>;
}
