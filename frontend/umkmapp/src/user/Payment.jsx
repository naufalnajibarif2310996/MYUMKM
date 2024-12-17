import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const products = location.state?.products || []; // Ambil produk yang dipilih dari state

  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Pilih metode pembayaran terlebih dahulu!");
      return;
    }

    // Logika untuk proses pembayaran dapat ditambahkan di sini
    alert("Pembayaran berhasil!");
    navigate("/"); // Kembali ke halaman utama setelah pembayaran berhasil
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

          {/* Pilihan Metode Pembayaran */}
          <div className="payment-methods" style={{ maxWidth: "800px", width: "100%" }}>
            <h4>Pilih Metode Pembayaran</h4>
            <div className="form-check">
              <input
                type="radio"
                id="creditCard"
                name="paymentMethod"
                value="Kartu Kredit"
                className="form-check-input"
                checked={paymentMethod === "Kartu Kredit"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label" htmlFor="creditCard">
                Kartu Kredit
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="bankTransfer"
                name="paymentMethod"
                value="Transfer Bank"
                className="form-check-input"
                checked={paymentMethod === "Transfer Bank"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label" htmlFor="bankTransfer">
                Transfer Bank
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="digitalWallet"
                name="paymentMethod"
                value="Dompet Digital"
                className="form-check-input"
                checked={paymentMethod === "Dompet Digital"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label" htmlFor="digitalWallet">
                Dompet Digital
              </label>
            </div>
          </div>

          {/* Tombol untuk Melanjutkan Pembayaran */}
          <button
            className="btn btn-primary mt-4"
            onClick={handlePayment}
          >
            Konfirmasi Pembayaran
          </button>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Payment;
