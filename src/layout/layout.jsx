import { Outlet } from "react-router-dom";

import Sidebar from "../components/sidebar.jsx";
import Topbar from "../components/topbar.jsx";

import "../styles/layout.css";

function Layout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-section">
        <Topbar />

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
