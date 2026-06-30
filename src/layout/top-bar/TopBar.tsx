import { useLocation } from "react-router-dom";
import "./top-bar.sass";
import { RxAvatar } from "react-icons/rx";
import { ROUTES } from "src/services/appRoutes/routes";

const TopBar = () => {
  const activePath = useLocation().pathname;
  const getPageTitle = (path: string) => {
    const route = Object.values(ROUTES).find((route) => route.path === path);
    return route ? route.title : "";
  };

  return (
    <div className="p-2 px-4 flex justify-between bg-white top-bar">
      <div className="top-bar-title">{getPageTitle(activePath)}</div>
      <div className="text-2xl">
        <RxAvatar />
      </div>
    </div>
  );
};

export default TopBar;
