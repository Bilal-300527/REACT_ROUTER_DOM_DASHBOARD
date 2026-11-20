import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">M</div>
        <h2>MyStudio</h2>
      </div>

      <div className="sidebar-menu">
        <p className="menu-heading">INVENTORY MANAGEMENT</p>

        <NavLink to="/purchase" className="menu-link">
          <span>🛒</span>
          <p>Purchase</p>
        </NavLink>

        <NavLink to="/stock" className="menu-link">
          <span>📦</span>
          <p>Stock</p>
        </NavLink>

        <NavLink to="/sales" className="menu-link">
          <span>💰</span>
          <p>Sales</p>
        </NavLink>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="user-avatar">MB</div>

          <div>
            <h4>Mohammad Bilal</h4>
            <p>Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
