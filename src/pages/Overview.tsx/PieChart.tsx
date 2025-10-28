import { PieChart } from "@mui/x-charts/PieChart";

export default function BasicPie() {
  return (
    <PieChart
      hideLegend
      colors={["#709bdb", "#70db97", "#db7270", "#70db97"]}
      series={[
        {
          data: [
            { id: 0, value: 100, label: "Returned Good Condition" },
            { id: 1, value: 20, label: "Returned poor condition" },
            { id: 2, value: 10, label: "Returned Delayed" },
            { id: 3, value: 5, label: "Not Returned" },
          ],
        },
      ]}
    />
  );
}
