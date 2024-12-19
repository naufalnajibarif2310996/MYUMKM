import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Checkout() {
  const { id } = useParams(); // Mengambil ID produk dari URL
  const navigate = useNavigate();
  const [produk, setProduk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    kategori: "",
    harga: "",
    stok: "",
    status: "",
    gambar: null, // Gambar diubah menjadi null untuk menyimpan file
    previewGambarBaru: null, // Untuk menyimpan URL gambar baru
  });

  // State untuk jumlah produk yang dibeli
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Token tidak ditemukan, silakan login terlebih dahulu.");
      setLoading(false);
      return;
    }

    const fetchProduk = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/produk/${id}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Produk tidak ditemukan.");
        }

        const data = await response.json();
        setProduk(data);
        setFormData({
          nama: data.nama,
          kategori: data.kategori,
          harga: data.harga,
          stok: data.stok,
          status: data.status,
          gambar: data.gambar,
          previewGambarBaru: null,
        });
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data produk.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduk();
  }, [id]);

  const handleQuantityChange = (value) => {
    setQuantity(Math.max(1, value || 1)); // Pastikan nilai minimal 1
  };

  const handleCheckout = () => {
    navigate("/payment", { state: { produk, quantity } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
              src={formData.gambar || "path/to/default-image.jpg"}
              alt={formData.nama || "Nama Produk"}
              style={{ width: "80px", height: "80px", objectFit: "cover", marginRight: "10px" }}
            />
            <div className="d-flex flex-column">
              <p className="mb-1">{formData.nama}</p>
              <strong>Rp. {formData.harga ? formData.harga.toLocaleString() : "0"}</strong>
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
          <button type="button" className="btn btn-primary" onClick={handleCheckout}>
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
