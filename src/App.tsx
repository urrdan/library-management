import { HashRouter } from "react-router-dom";
import "./App.css";
import MainDisplay from "./layout/MainDisplay";
import Sidebar from "./layout/sidebar/Sidebar";
import { MainContext } from "./pages/MainContext";
import { RxAvatar } from "react-icons/rx";
import { FiUploadCloud } from "react-icons/fi";

function App() {
  const p = [];
  for (let i = 0; i < 20; i++) {
    p.push(i);
  }
  return (
    <HashRouter>
      <MainContext>
        <div className="h-full flex flex-grow overflow-hidden bg-gray-200 border-2 border-red-700">
          <Sidebar />
          <div className="flex-grow flex flex-col">
            <div className="p-2 px-4 flex justify-between bg-white">
              <div></div>
              <div className="flex gap-3 text-2xl">
                <FiUploadCloud />
                <RxAvatar />
              </div>
            </div>
            <div className="p-4 flex-grow overflow-auto ">
              <MainDisplay />
            </div>
          </div>
        </div>
      </MainContext>
    </HashRouter>
  );
}

export default App;
