import { LineChart } from "@mui/x-charts";

const Chart = () => {
  const margin = { right: 24 };
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const nData = [3000, 2500, 1000, 1780, 1090, 890, 490];
  const xLabels = [
    "Page A",
    "Page B",
    "Page C",
    "Page D",
    "Page E",
    "Page F",
    "Page G",
  ];
  return (
    <LineChart
      //height={300}
      series={[
        {
          data: uData,
          label: "uv",
          area: true,
          showMark: false,
          color: "#709bdb",
        },
        {
          data: nData,
          label: "nv",
          area: true,
          showMark: false,
          color: "#db7270",
        },
      ]}
      xAxis={[{ scaleType: "point", data: xLabels }]}
      /*  sx={{
          [`& .${lineElementClasses.root}`]: {
            display: "none",
          },
        }} */
      margin={margin}
    />
  );
};
export default Chart;
