import {
  BookOpen,
  Users,
  ArrowLeftRight,
  TriangleAlert,
  MoveRight,
  UserRoundPlus,
  BookPlus,
  Undo,
} from "lucide-react";
import DashSummaryCard from "./DashSummaryCard";
import RentalsChart from "./RentalChart";
import RentalTable from "../rentals/RentalTable";
import "./dashboard.sass";
import DashBookTable from "./DashBookTable";
import { useEffect, useState } from "react";
import type { DashboardData } from "src/types/dashboardTypes";
import { getDashboardAPI } from "src/api/dashboardApi";
import Loading from "src/components/loading/Loading";
import MyButton from "src/components/my-button/MyButton";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData>();
  const [loading, setLoading] = useState(true);

  const getDashboardData = () => {
    getDashboardAPI().then((res) => {
      setLoading(false);
      console.log(res.data);

      setDashboardData(res.data);
    });
  };
  useEffect(getDashboardData, []);
  return (
    <>
      <div className="dashboard">
        {!loading && dashboardData ? (
          <>
            <div className="grid grid-cols-4 gap-4 gap-x-6 mb-4">
              <DashSummaryCard
                title="Total Books"
                value={dashboardData.kpis.totalBooks}
                subtitle="Across all categories"
                icon={<BookOpen size={28} />}
                type="info"
              />

              <DashSummaryCard
                title="Customers"
                value={dashboardData.kpis.totalCustomers}
                subtitle="Registered members"
                icon={<Users size={28} />}
                type="success"
              />

              <DashSummaryCard
                title="Active Rentals"
                value={dashboardData.kpis.activeRentals}
                subtitle="Currently borrowed"
                icon={<ArrowLeftRight size={28} />}
                type="neutral"
              />

              <DashSummaryCard
                title="Overdue"
                value={dashboardData?.kpis.overdueRentals}
                subtitle="Need attention"
                icon={<TriangleAlert size={28} />}
                type="danger"
              />
            </div>

            <div className="flex gap-6 mb-6">
              <div className="flex-grow-1 ">
                <RentalsChart />
              </div>

              <div className="dashboard-card text-xs">
                <div className="dash-card-title-bar">
                  <h5>Running Low</h5>
                  <MyButton
                    title="See More"
                    link
                    icon={<MoveRight />}
                    iconRight
                  />
                </div>

                <DashBookTable books={dashboardData.runningLowBooks} />
              </div>
              {/* <Test /> */}

              <div className="w-50 dashboard-card dash-quick-actions">
                <div className="dash-card-title-bar">
                  <h5>Quick Action</h5>
                </div>
                <div className="dash-actions-wrapper">
                  <div className="dash-action">
                    <BookPlus />
                    <div>Add Book</div>
                  </div>
                  <div className=" dash-action">
                    <UserRoundPlus />
                    <div>Add Customer</div>
                  </div>
                  <div className="dash-action">
                    <ArrowLeftRight /> <div>Rent Book</div>
                  </div>
                  <div className="dash-action">
                    <Undo /> <div>Renturn Rental</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 gap-x-6 mb-4">
              <div className="dashboard-card">
                <div className="dash-card-title-bar">
                  <h5>Recent Rentals</h5>
                  <MyButton
                    title="See More"
                    link
                    icon={<MoveRight />}
                    iconRight
                  />
                </div>
                <RentalTable
                  rentals={dashboardData.recentRentals}
                  getRentals={() => {}}
                  showColumns={["customer", "book", "rentedDate", "dueDate"]}
                  pagination={false}
                  isCompact
                />
              </div>
              <div className="dashboard-card">
                <div className="dash-card-title-bar">
                  <h5>Overdue Rentals</h5>
                  <MyButton
                    title="See More"
                    link
                    icon={<MoveRight />}
                    iconRight
                  />
                </div>
                <RentalTable
                  rentals={dashboardData.overdueRentals}
                  getRentals={() => {}}
                  showColumns={["customer", "book", "dueDate", "overdueDays"]}
                  pagination={false}
                  isCompact
                />
              </div>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
