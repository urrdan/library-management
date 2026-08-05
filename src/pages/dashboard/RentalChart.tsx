import { MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getRentalChartAPI } from "src/api/dashboardApi";
import MyButton from "src/components/my-button/MyButton";
import type { RentalChartPoint } from "src/types/dashboardTypes";

const data = [
  { label: "Mon", rentals: 25 },
  { label: "Tue", rentals: 35 },
  { label: "Wed", rentals: 18 },
  { label: "Thu", rentals: 45 },
  { label: "Fri", rentals: 28 },
  { label: "Sat", rentals: 9 },
  { label: "Sun", rentals: 14 },
];

export default function RentalsChart() {
  const [chartData, setChartData] = useState<RentalChartPoint[]>(data);
  useEffect(() => {
    getRentalChartAPI().then((res) => {
      console.log(res.data);
      setChartData(res.data);
    });
  }, []);
  return (
    <div className="dashboard-card h-full">
      <div className="dash-card-title-bar">
        <h5 className="">Rentals Last 7 Days</h5>
        <MyButton title="See More" link icon={<MoveRight />} iconRight />
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="label" />

            <YAxis width={20} />

            <Tooltip />

            <Bar dataKey="rentals" radius={[8, 8, 0, 0]} fill="#2563EB" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
