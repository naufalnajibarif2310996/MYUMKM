import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Pembayaran.css"; 
import Sidebar from "./Sidebar"; 
import Navbar from "./Navbar"; 

const Pembayaran = ({ setPageTitle }) => {
  const navigate = useNavigate();

  // Fungsi untuk menavigasi ke halaman detail pembayaran
  const handleDetailPembayaran = (id) => {
    navigate(`/pembayaran/${id}`); // Navigasi ke halaman detail pembayaran dengan ID
  };

  // Dummy data pembayaran
  const dataPembayaran = [
    {
      id: "P001",
      nama: "John Doe",
      tanggal: "15 Desember 2024",
      jumlah: "Rp 500.000",
      status: "Lunas",
      metode: "Transfer Bank",
    },
    {
      id: "P002",
      nama: "Jane Smith",
      tanggal: "16 Desember 2024",
      jumlah: "Rp 750.000",
      status: "Pending",
      metode: "E-Wallet",
    },
  ];

  // Set judul halaman di Navbar
  React.useEffect(() => {
    if (setPageTitle) setPageTitle("Pembayaran");
  }, [setPageTitle]);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <Sidebar setPageTitle={setPageTitle} />

      <div className="main-content">
        {/* Navbar */}
        <Navbar pageTitle="Pembayaran" />

        {/* Kontainer utama halaman Pembayaran */}
        <div className="container pembayaran-container">
          {/* Tombol untuk menambahkan pembayaran */}

          {/* Tabel daftar pembayaran */}
          <table>
            <thead>
              <tr>
                <th>ID Pembayaran</th>
                <th>Nama Pelanggan</th>
                <th>Tanggal Pembayaran</th>
                <th>Jumlah Pembayaran</th>
                <th>Status Pembayaran</th>
                <th>Metode Pembayaran</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataPembayaran.map((pembayaran) => (
                <tr key={pembayaran.id}>
                  <td>{pembayaran.id}</td>
                  <td>{pembayaran.nama}</td>
                  <td>{pembayaran.tanggal}</td>
                  <td>{pembayaran.jumlah}</td>
                  <td
                    className={
                      pembayaran.status === "Lunas"
                        ? "status-lunas"
                        : "status-pending"
                    }
                  >
                    {pembayaran.status}
                  </td>
                  <td>{pembayaran.metode}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => handleDetailPembayaran(pembayaran.id)}
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pembayaran;
