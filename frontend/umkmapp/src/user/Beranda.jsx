import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./css/Beranda.css"

function UserDashboard() {
  const [produkList, setProdukList] = useState([]); // Menyimpan daftar produk
  const [loading, setLoading] = useState(true); // Indikator loading
  const [error, setError] = useState(null); // Menyimpan pesan kesalahan
  const navigate = useNavigate(); // Untuk navigasi halaman

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    // Debugging token
    console.log("Token diambil dari localStorage:", token);

    if (!token) {
      setError("Token tidak ditemukan, silakan login terlebih dahulu.");
      setLoading(false);
      return;
    }

    const fetchProduk = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/produk/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        console.log("Status kode respons:", response.status);

        if (response.status === 401) {
          window.alert("Sesi Anda telah berakhir, silakan login ulang.");
          setError("Sesi Anda telah berakhir, silakan login ulang.");
          localStorage.removeItem("access_token");
          navigate("/login");
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data produk:", data);

        // Pastikan data adalah array dan atur ke state
        setProdukList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Kesalahan mengambil data:", err.message);
        setError("Terjadi kesalahan saat mengambil data produk.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduk();
  }, [navigate]);

  // Fungsi untuk mengarahkan ke halaman checkout
  const handleBuyNow = () => {
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="beranda-layout d-flex" style={{ height: "100vh" }}>
      <Sidebar />
      <div className="beranda-content flex-grow-1 d-flex flex-column">
        <Navbar />
        <div className="main-content d-flex flex-column align-items-center justify-content-center p-4">
          <p className="beranda-subtitle text-muted text-center mb-4">
            Selamat Datang, <strong>Pengguna!</strong>
          </p>

          <div className="row justify-content-center w-100" style={{ maxWidth: "1200px", marginTop: "20px" }}>
            {produkList.map((produk) => (
              <div key={produk.id} className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex justify-content-center">
                <div className="card p-3 shadow-lg text-center d-flex flex-column justify-content-between" style={{ width: "100%", maxWidth: "400px", height: "450px" }}>
                  <img
                    src={produk.gambar} // Menggunakan produk.gambar yang sesuai dengan field gambar dari DB
                    alt={produk.nama} // Menggunakan produk.nama untuk alt image
                    className="card-img-top"
                    style={{ height: "180px", objectFit: "cover", borderRadius: "8px" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold mt-2">{produk.nama}</h5>
                    <p className="card-text text-primary fs-5">Harga: Rp. {Number(produk.harga).toLocaleString()}</p>
                    <p className="card-text text-secondary mb-2">Status: {produk.status}</p>
                    <p className="card-text text-secondary mb-2">Kategori: {produk.kategori}</p>
                    <p className="card-text text-secondary mb-2">Stok: {produk.stok}</p>
                    <button
                          className="btn btn-primary me-2"
                          onClick={() => navigate(`/checkout/${produk.id}`)}
                        >
                          Beli Sekarang
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
