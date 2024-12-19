import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import "./css/Pelanggan.css";

function CustomerList() {
  const navigate = useNavigate();
  const [pelangganList, setPelangganList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Token tidak ditemukan, silakan login terlebih dahulu.");
      setLoading(false);
      return;
    }

    const fetchPelanggan = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/users/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

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
        console.log("Data pelanggan lengkap:", JSON.stringify(data, null, 2));

        // Filter untuk hanya menampilkan pelanggan dengan role 'user' (bukan superuser)
        const filteredData = data.filter((pelanggan) => pelanggan.username !== "admin");
        setPelangganList(filteredData);
      } catch (err) {
        console.error("Kesalahan mengambil data:", err.message);
        setError("Terjadi kesalahan saat mengambil data pelanggan.");
      } finally {
        setLoading(false);
      }
    };

    fetchPelanggan();
  }, [navigate]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date)) throw new Error("Invalid date");
      return date.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return "Tanggal Tidak Tersedia";
    }
  };

  return (
    <div className="Pelanggan-layout d-flex" style={{ height: "100vh" }}>
      <Sidebar />
      <div className="Pelanggan-content flex-grow-1 d-flex flex-column">
        <Navbar />
        <div className="main-content d-flex flex-column align-items-center justify-content-center p-4">
          <p className="Pelanggan-subtitle text-muted text-center mb-4">
            Daftar Pelanggan
          </p>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="table-responsive w-100" style={{ maxWidth: "1200px", marginTop: "20px" }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Date Joined</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  pelangganList.map((pelanggan, index) => (
                    <tr key={pelanggan.id}>
                      <td>{index + 1}</td>
                      <td>{pelanggan.username}</td>
                      <td>{pelanggan.email}</td>
                      <td>{formatDate(pelanggan.date_joined)}</td>
                      <td>{pelanggan.is_active !== undefined ? (pelanggan.is_active ? "Aktif" : "Non-Aktif") : "Status Tidak Tersedia"}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => alert(`Lihat detail untuk ${pelanggan.username}`)}
                        >
                          Lihat Detail
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default CustomerList;
