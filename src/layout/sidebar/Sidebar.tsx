import SidebarNavigation from "./SidebarNavigation";
import "./sidebar.sass";

const Sidebar = () => {
  return (
    <div className="sidebar ">
      <div className="sidebar-logo">LOGO</div>
      <SidebarNavigation />

      <section>Powered BY Urrdan</section>
    </div>
  );
};
export default Sidebar;
