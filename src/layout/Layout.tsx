import AppRoutes from "src/services/appRoutes/AppRoutes";
import TopBar from "./top-bar/TopBar";
import Sidebar from "./sidebar/Sidebar";
import "./layout.sass";

const Layout = () => {
  return (
    <div className="h-full flex flex-grow overflow-hidden bg-gray-200 border-2 border-red-700 app-layout">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <TopBar />
        <div className="p-4 flex-grow overflow-auto ">
          <AppRoutes />
        </div>
      </div>
    </div>
  );
};

export default Layout;
