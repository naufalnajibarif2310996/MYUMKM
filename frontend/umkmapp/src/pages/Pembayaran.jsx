import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Pembayaran.css"; // Impor CSS khusus untuk halaman Pembayaran

const Pembayaran = () => {
  const navigate = useNavigate();

  // Fungsi untuk menavigasi ke halaman detail pembayaran
  const handleDetailPembayaran = (id) => {
    navigate(`/pembayaran/${id}`); // Navigasi ke halaman detail pembayaran dengan ID
  };

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

  return (
    <div className="container">
      <h2>Pembayaran</h2>
      {/* Tombol untuk menambahkan pembayaran baru */}
      <button
        className="btn btn-primary"
        onClick={() => navigate("/tambahpembayaran")}
      >
        Tambahkan Pembayaran
      </button>

      {/* Tabel untuk menampilkan daftar pembayaran */}
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
          {/* Mapping data pembayaran */}
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
                {/* Tombol untuk menavigasi ke halaman detail pembayaran */}
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
  );
};

export default Pembayaran;
