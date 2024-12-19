import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./css/TambahProduk.css";

function TambahProduk() {
  const navigate = useNavigate();
  const [namaProduk, setNamaProduk] = useState("");
  const [kategori, setKategori] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [status, setStatus] = useState("Tersedia");
  const [gambar, setGambar] = useState(null);
  const [message, setMessage] = useState("");

  // Fungsi untuk mengirim data ke backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!namaProduk || !kategori || !harga || !stok) {
      setMessage("Semua kolom wajib diisi.");
      return;
    }

    // Membuat FormData untuk mengirim data
    const formData = new FormData();
    formData.append("nama", namaProduk);
    formData.append("kategori", kategori);
    formData.append("harga", harga);
    formData.append("stok", stok);
    formData.append("status", status);

    if (gambar) {
      formData.append("gambar", gambar);
    }

    // Mengambil token dari localStorage
    const token = localStorage.getItem("access_token");

    if (!token) {
      setMessage("Token tidak ditemukan, silakan login kembali.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/produk/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Menambahkan token di header
        },
        body: formData, // Mengirim data sebagai FormData
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Produk berhasil ditambahkan!");
        navigate("/produk"); // Kembali ke halaman Produk setelah berhasil
      } else {
        setMessage(data.detail || "Terjadi kesalahan, coba lagi.");
        console.error("Error response:", data);

        // Menangani kesalahan jika token tidak valid
        if (data.code === "token_not_valid") {
          setMessage("Token tidak valid, silakan login ulang.");
          localStorage.removeItem("access_token"); // Menghapus token yang tidak valid
          navigate("/login"); // Arahkan ke halaman login
        }
      }
    } catch (error) {
      setMessage("Terjadi kesalahan pada server.");
      console.error("Error adding product:", error);
    }
  };

  useEffect(() => {
            // Menambahkan kelas khusus untuk login page
            document.body.classList.add('produk');
            
            // Membersihkan kelas setelah komponen unmount
            return () => {
              document.body.classList.remove('produk');
            };
          }, []);

  return (
    <div className="TP-layout">
      <Sidebar />

      <div className="TP-content">
        <Navbar />

        <div className="main-content">
          <h2>Tambah Produk</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="namaProduk" className="col-form-label">
                Nama Produk:
              </label>
              <input
                type="text"
                className="form-control"
                id="namaProduk"
                value={namaProduk}
                onChange={(e) => setNamaProduk(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="kategori" className="col-form-label">
                Kategori:
              </label>
              <input
                type="text"
                className="form-control"
                id="kategori"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="harga" className="col-form-label">
                Harga:
              </label>
              <input
                type="number"
                className="form-control"
                id="harga"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="stok" className="col-form-label">
                Stok:
              </label>
              <input
                type="number"
                className="form-control"
                id="stok"
                value={stok}
                onChange={(e) => setStok(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="col-form-label">
                Status:
              </label>
              <select
                className="form-control"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Tersedia">Tersedia</option>
                <option value="Habis">Habis</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="gambar" className="col-form-label">
                Gambar Produk:
              </label>
              <input
                type="file"
                className="form-control"
                id="gambar"
                onChange={(e) => setGambar(e.target.files[0])}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-5">
              Tambah Produk
            </button>
          </form>

          {/* Pesan setelah produk ditambahkan */}
          {message && <p>{message}</p>}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default TambahProduk;
