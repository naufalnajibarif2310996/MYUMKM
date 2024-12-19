import { useEffect, useState } from "react";
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer"; // Import footer
import { useNavigate } from "react-router-dom"; // Import useNavigate untuk redirect
import "./css/Dashboard.css";
import "../App.css";

function Dashboard() {
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const [totalProducts, setTotalProducts] = useState(0); // State untuk jumlah produk
  const [totalUsers, setTotalUsers] = useState(0); // State untuk jumlah pengguna
  const [loadingProducts, setLoadingProducts] = useState(true); // State untuk loading data produk
  const [loadingUsers, setLoadingUsers] = useState(true); // State untuk loading data pengguna
  const [error, setError] = useState(""); // State untuk menangani error

  // Mengambil data produk dan pengguna saat komponen dimuat
  useEffect(() => {
    const token = localStorage.getItem("access_token"); // Ambil token dari localStorage

    if (!token) {
      setError("Anda harus login terlebih dahulu.");
      alert("Anda harus login terlebih dahulu!"); // Tampilkan alert sebelum redirect
      navigate("/login"); // Redirect ke halaman login jika token tidak ada
      return; // Jangan lanjutkan jika token tidak ada
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/produk/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Kirim token di header
          },
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data produk.");
        }

        const data = await response.json();
        setTotalProducts(data.length); // Menyimpan jumlah produk
      } catch (err) {
        setError(err.message); // Menangani error
      } finally {
        setLoadingProducts(false); // Menandakan bahwa data produk sudah selesai diambil
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/users/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Kirim token di header
          },
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data pengguna.");
        }

        const data = await response.json();
        setTotalUsers(data.length); // Menyimpan jumlah pengguna
      } catch (err) {
        setError(err.message); // Menangani error
      } finally {
        setLoadingUsers(false); // Menandakan bahwa data pengguna sudah selesai diambil
      }
    };

    fetchProducts();
    fetchUsers();
  }, [navigate]); // Menambahkan navigate ke dependency array

  return (
    <div className="dashboard-layout d-flex">
      <Sidebar />
      <div className="dashboard-content flex-grow-1 d-flex flex-column">
        <Navbar />
        <div className="main-content flex-grow-1 p-4">
          <p className="dashboard-subtitle text-muted">
            Selamat Datang, <strong>Pelapak!</strong>
          </p>

          <div className="dashboard-cards row mt-4">
            <div className="card col-md-6 p-3 mb-3 shadow-sm">
              <h3 className="card-title text-secondary">Total Produk</h3>
              <p className="card-text fs-4 fw-bold">
                {loadingProducts ? "Memuat..." : error ? error : totalProducts}
              </p>
            </div>

            <div className="card col-md-6 p-3 mb-3 shadow-sm">
              <h3 className="card-title text-secondary">Total Pengguna</h3>
              <p className="card-text fs-4 fw-bold">
                {loadingUsers ? "Memuat..." : error ? error : totalUsers}
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
