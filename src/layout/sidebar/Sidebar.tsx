import { useState } from "react";
import { FoldHorizontal, Landmark, UnfoldHorizontal } from "lucide-react";
import SidebarNavigation from "./SidebarNavigation";
import "./sidebar.sass";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <Landmark size={40} className="sidebar-logo" />

          <span className="sidebar-brand-text">Library System</span>
        </div>

        <button
          type="button"
          className="sidebar-toggle"
          onClick={() => setIsCollapsed((prev) => !prev)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <UnfoldHorizontal size={25} />
          ) : (
            <FoldHorizontal size={25} />
          )}
        </button>
      </div>

      <SidebarNavigation />

      <section className="sidebar-footer">
        <span className="sidebar-text">Powered BY Urrdan</span>
      </section>
    </aside>
  );
};

export default Sidebar;
