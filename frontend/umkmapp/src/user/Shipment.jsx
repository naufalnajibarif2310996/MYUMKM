import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Shipping() {
  const navigate = useNavigate();
  const location = useLocation();
  const products = location.state?.products || []; // Ambil produk dari state
  const shippingInfo = location.state?.shippingInfo || {}; // Ambil informasi pengiriman

  const [confirmed, setConfirmed] = useState(false);

  const handleConfirmShipping = () => {
    // Simulasi pengiriman berhasil
    alert("Pengiriman berhasil diproses!");
    navigate("/"); // Arahkan kembali ke halaman utama setelah konfirmasi pengiriman
  };

  return (
    <div className="dashboard-layout d-flex" style={{ height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      <div className="dashboard-content flex-grow-1 d-flex flex-column">
        {/* Navbar */}
        <Navbar />

        <div className="main-content d-flex flex-column align-items-center justify-content-center p-4">

          {/* Daftar Produk yang Dibeli */}
          <div className="product-list mb-4" style={{ maxWidth: "800px" }}>
            {products.map((product, index) => (
              <div key={index} className="product-item d-flex justify-content-between mb-3">
                <img src={product.image} alt={product.name} style={{ width: "50px", marginRight: "10px" }} />
                <div>
                  <p className="mb-1">{product.name}</p>
                  <strong>Rp. {product.price.toLocaleString()}</strong>
                </div>
              </div>
            ))}
          </div>

          {/* Informasi Pengiriman */}
          <div className="shipping-info" style={{ maxWidth: "800px", width: "100%" }}>
            <h4>Informasi Pengiriman</h4>
            <p><strong>Nama:</strong> {shippingInfo.name}</p>
            <p><strong>Alamat:</strong> {shippingInfo.address}</p>
            <p><strong>No. Telepon:</strong> {shippingInfo.phone}</p>
          </div>

          {/* Konfirmasi Pengiriman */}
          <div className="confirmation mt-4" style={{ maxWidth: "800px", width: "100%" }}>
            <button
              className="btn btn-primary"
              onClick={handleConfirmShipping}
            >
              Konfirmasi Pengiriman
            </button>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Shipping;
