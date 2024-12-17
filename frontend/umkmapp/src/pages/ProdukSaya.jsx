import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import "./css/ProdukSaya.css";

function ProdukSaya() {
  const navigate = useNavigate();
  const [produkList, setProdukList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="Produk-admin">
      {/* Sidebar */}
      <Sidebar />

      <div className="produkisi-admin">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="produk-content">
          <h3 className="judul-produk pb-4 fw-bold">Daftar Produk</h3>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : produkList.length === 0 ? (
            <p className="kata-produk">
              Belum ada produk, silakan tambahkan produk baru.
            </p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="table-blue">
                  <tr>
                    <th>No</th>
                    <th>Gambar</th>
                    <th>Nama Produk</th>
                    <th>Kategori</th>
                    <th>Harga</th>
                    <th>Stok</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {produkList.map((produk, index) => (
                    <tr key={produk.id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={produk.gambar}
                          alt={produk.nama}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td>{produk.nama}</td>
                      <td>{produk.kategori}</td>
                      <td>Rp {produk.harga.toLocaleString()}</td>
                      <td>{produk.stok}</td>
                      <td>{produk.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tombol Tambah Produk */}
          <div className="row mt-3">
            <div className="col-8">
              <button
                className="btn btn-primary btn-produk"
                onClick={() => navigate("/tambahproduk")}
              >
                Tambah Produk
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ProdukSaya;
