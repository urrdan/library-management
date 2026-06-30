import "./StatusBadge.sass";
export type StatusBadgeType = "success" | "info" | "warning" | "danger";
export default function ({
  title,
  status,
}: {
  title: string;
  status: StatusBadgeType;
}) {
  return <div className={`my-badge my-badge-${status}`}>{title}</div>;
}
