import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Checkout() {
  // Contoh satu produk untuk prototipe
  const product = {
    name: "Produk A",
    price: 150000,
    image: "https://via.placeholder.com/150",
  };

  // State untuk jumlah produk yang dibeli
  const [quantity, setQuantity] = useState(1);

  // Fungsi untuk menangani perubahan jumlah produk
  const handleQuantityChange = (value) => {
    setQuantity(Math.max(1, value)); // Pastikan nilai minimal 1
  };

  return (
    <div className="dashboard-layout d-flex" style={{ height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      <div className="dashboard-content flex-grow-1 d-flex flex-column">
        {/* Navbar */}
        <Navbar />

        <div className="main-content d-flex flex-column align-items-center justify-content-center p-4">

          {/* Daftar Produk */}
          <div className="product-item d-flex justify-content-between align-items-center mb-3" style={{ maxWidth: "800px", width: "100%" }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "80px", height: "80px", objectFit: "cover", marginRight: "10px" }}
            />
            <div className="d-flex flex-column">
              <p className="mb-1">{product.name}</p>
              <strong>Rp. {product.price.toLocaleString()}</strong>
            </div>
            <div>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                style={{ width: "60px" }}
              />
            </div>
          </div>

          {/* Tombol Lanjutkan ke Pembayaran */}
          <button type="button" className="btn btn-primary">
            Lanjutkan ke Pembayaran
          </button>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Checkout;
