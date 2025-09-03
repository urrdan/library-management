import { HashRouter } from "react-router-dom";
import "./App.css";
import MainDisplay from "./layout/MainDisplay";
import Sidebar from "./layout/sidebar/Sidebar";

function App() {
  const p = [];
  for (let i = 0; i < 20; i++) {
    p.push(i);
  }
  return (
    <HashRouter>
      <div className="h-full flex flex-grow overflow-hidden bg-gray-100 border-2 border-red-700">
        <Sidebar />
        <div className="flex-grow flex flex-col  ">
          <div className="p-2 flex justify-between ">
            <input type="search" placeholder="Searchs" />
            <div>&#11057;</div>
          </div>
          <div className="p-4 flex-grow overflow-auto ">
            <MainDisplay />
          </div>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
