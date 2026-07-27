import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { day: "Mon", rentals: 25 },
  { day: "Tue", rentals: 35 },
  { day: "Wed", rentals: 18 },
  { day: "Thu", rentals: 45 },
  { day: "Fri", rentals: 28 },
  { day: "Sat", rentals: 9 },
  { day: "Sun", rentals: 14 },
];

export default function RentalsChart() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm h-full">
      <h5 className="">Rentals Last 7 Days</h5>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis width={30} />

          <Tooltip />

          <Bar dataKey="rentals" radius={[8, 8, 0, 0]} fill="#2563EB" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
