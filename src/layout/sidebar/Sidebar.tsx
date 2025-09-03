import SidebarNavigation from "./SidebarNavigation";

const Sidebar = () => {
  return (
    <div className="w-50 p-2 flex flex-col sidebar text-gray-300 bg-gray-800 ">
      <div className="font-bold text-2xl text-center ">LOGO</div>
      <SidebarNavigation />

      <section>Powered BY Urrdan</section>
    </div>
  );
};
export default Sidebar;
