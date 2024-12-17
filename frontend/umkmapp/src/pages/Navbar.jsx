import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./css/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Tentukan keterangan berdasarkan path
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Halaman Utama";
      case "/penjualan":
        return "Penjualan";
      case "/produk":
        return "Produk Saya";
      case "/tambahproduk":
        return "Tambah Produk";
      case "/profil":
        return "Profil Pelapak";
      default:
        return "MYUMKM"; // Default jika path tidak dikenali
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar?");
    if (confirmLogout) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      navigate("/login");
      alert("Anda telah keluar.");
    }
  };

  // px-3 d-flex justify-content-between align-items-center
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="navbar-left">
        <h3 className="page-title text-primary m-0">{getPageTitle()}</h3> {/* Menampilkan judul halaman */}
      </div>
      <div className="navbar-right">
        <button
          className="btn btn-primary"
          onClick={handleLogout}
        >
          Keluar
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
