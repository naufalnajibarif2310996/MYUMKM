import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

function UserDashboard() {
  const navigate = useNavigate(); // Gunakan navigate untuk berpindah halaman

  const products = [
    {
      name: "Produk A",
      price: 150000,
      status: "Tersedia",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Produk B",
      price: 200000,
      status: "Habis",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Produk C",
      price: 100000,
      status: "Tersedia",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Produk D",
      price: 250000,
      status: "Tersedia",
      image: "https://via.placeholder.com/150",
    },
  ];

  // Fungsi untuk mengarahkan ke halaman checkout
  const handleBuyNow = () => {
    navigate("/checkout"); // Arahkan ke halaman checkout
  };

  return (
    <div className="dashboard-layout d-flex" style={{ height: "100vh" }}>
      <Sidebar />
      <div className="dashboard-content flex-grow-1 d-flex flex-column">
        <Navbar />
        <div className="main-content d-flex flex-column align-items-center justify-content-center p-4">
          <p className="dashboard-subtitle text-muted text-center mb-4">
            Selamat Datang, <strong>Pengguna!</strong>
          </p>

          <div className="row justify-content-center w-100" style={{ maxWidth: "1200px", marginTop: "20px" }}>
            {products.map((product, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex justify-content-center">
                <div className="card p-3 shadow-lg text-center d-flex flex-column justify-content-between" style={{ width: "100%", maxWidth: "400px", height: "450px" }}>
                  <img src={product.image} alt={product.name} className="card-img-top" style={{ height: "180px", objectFit: "cover", borderRadius: "8px" }} />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold mt-2">{product.name}</h5>
                    <p className="card-text text-primary fs-5">Harga: Rp. {product.price.toLocaleString()}</p>
                    <p className="card-text text-secondary mb-2">Status: {product.status}</p>
                    <button
                      className={`btn ${product.status === "Tersedia" ? "btn-primary" : "btn-secondary"} mt-auto`}
                      disabled={product.status !== "Tersedia"}
                      onClick={handleBuyNow} // Panggil fungsi handleBuyNow saat tombol diklik
                    >
                      {product.status === "Tersedia" ? "Beli Sekarang" : "Stok Habis"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default UserDashboard;
