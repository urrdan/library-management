import type { ReactNode } from "react";

type DashboardCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  iconBg: string;
};

export default function DashboardCard({
  title,
  value,
  subtitle,
  icon,
  iconBg,
}: DashboardCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full ${iconBg}`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h2 className="mt-2 text-4xl font-bold text-slate-900">{value}</h2>

          {!subtitle && (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
