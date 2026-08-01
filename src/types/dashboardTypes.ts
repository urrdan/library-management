import type { Book } from "./bookTypes";
import type { RentalView } from "./rentalTypes";

export type DashboardData = {
  kpis: DashboardKPIs;
  runningLowBooks: Book[];
  recentRentals: RentalView[];
  overdueRentals: RentalView[];
};

export type DashboardKPIs = {
  totalBooks: number;
  activeRentals: number;
  totalCustomers: number;
  overdueRentals: number;
};

export type RentalChartPoint = {
  label: string;
  rentals: number;
};

export type RentalChartPeriod = "week" | "month";
