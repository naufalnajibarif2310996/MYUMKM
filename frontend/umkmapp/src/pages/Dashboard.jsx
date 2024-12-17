import { useEffect } from "react";
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer"; // Import footer
import "./css/Dashboard.css";
import "../App.css"

function Dashboard() {
  useEffect(() => {
    // Menambahkan kelas khusus untuk halaman login
    document.body.classList.add("dashboard-page");

    // Membersihkan kelas setelah komponen unmount
    return () => {
      document.body.classList.remove("dashboard-page");
    };
  }, []);

  return (
    <div className="dashboard-layout d-flex">
      <Sidebar />
      <div className="dashboard-content flex-grow-1 d-flex flex-column">
        <Navbar />
        <div className="main-content flex-grow-1 p-4">
          <p className="dashboard-subtitle text-muted">
            Selamat Datang, <strong>Pelapak!</strong>
          </p>

          <div className="dashboard-cards row mt-4">
            <div className="card col-md-6 p-3 mb-3 shadow-sm">
              <h3 className="card-title text-secondary">Total Produk</h3>
              <p className="card-text fs-4 fw-bold">30</p>
            </div>
            <div className="card col-md-6 p-3 mb-3 shadow-sm">
              <h3 className="card-title text-secondary">Penjualan Hari Ini</h3>
              <p className="card-text fs-4 fw-bold">Rp. 500.000</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
