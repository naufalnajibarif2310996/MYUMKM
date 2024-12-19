import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Judul berdasarkan path
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/beranda":
        return "Beranda";
      case "/checkout/:id":
        return "Checkout";
      case "/payment":
        return "Payment";
      case "/shipment":
        return "Shipment";
      case "/setting":
        return "Setting";
      default:
        return "MYUMKM"; // Default jika path tidak dikenali
    }
  };

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      navigate("/login");
    }
  };

  return (
    <nav className="navbar navbar-light bg-light px-3 d-flex justify-content-between align-items-center">
      <h3 className="page-title text-primary m-0">{getPageTitle()}</h3>
      <button className="btn btn-primary mt-2" onClick={handleLogout}>
        Keluar
      </button>
    </nav>
  );
}

export default Navbar;
