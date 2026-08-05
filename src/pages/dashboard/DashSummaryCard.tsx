import type { ReactNode } from "react";

type DashSummaryCardProps = {
  title: string;
  value: number;
  subtitle?: string;
  icon: ReactNode;
  type?: string;
};

export default function DashSummaryCard({
  title,
  value,
  subtitle,
  icon,
  type = "default",
}: DashSummaryCardProps) {
  return (
    <div className=" dashboard-card">
      <div className="dash-summary-card">
        <div className={` dash-summary-card-icon ${type}`}>{icon}</div>
        <div>
          <p className="dash-summary-card-title">{title}</p>

          <h2 className=" dash-summary-card-value">{value}</h2>

          {!subtitle && (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
