import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";

import Home from "./pages/home.jsx";
import Purchase from "./components/purchase.jsx";
import Stock from "./components/stock.jsx";
import Sales from "./components/sales.jsx";
import About from "./pages/about.jsx";
import Service from "./pages/service.jsx";
import Contact from "./pages/contact.jsx";
import Layout from "./layout/layout";

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-section">
        <Topbar />

        <main className="page-content">
          <Routes element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Service />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout />
    </BrowserRouter>
  );
}

export default App;
