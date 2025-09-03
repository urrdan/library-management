import Chart from "./Chart";
import BasicPie from "./PieChart";
import "./Overview.css";
import OverheadCards from "./OverheadCards";

const Overview = () => {
  return (
    <div className="p-4">
      <OverheadCards />
      <div className="grid grid-cols-[2fr_1fr_1fr] h-75 gap-8">
        <div className="card">
          <Chart />
        </div>
        <div className="card">
          <BasicPie />
        </div>
        <div className="card">
          <BasicPie />
        </div>
      </div>
    </div>
  );
};
export default Overview;
