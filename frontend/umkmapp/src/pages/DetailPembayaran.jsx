import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/DetailPembayaran.css"; // Impor CSS khusus untuk halaman Detail Pembayaran

const DetailPembayaran = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/pembayaran"); // Navigasi kembali ke halaman pembayaran
  };

  // Contoh data detail pembayaran
  const detailPembayaran = {
    id: "P001",
    nama: "John Doe",
    tanggal: "15 Desember 2024",
    jumlah: "Rp 500.000",
    metode: "Transfer Bank",
    status: "Lunas",
    produk: [
      { nama: "Produk A", harga: "Rp 150.000", jumlah: 2, total: "Rp 300.000" },
      { nama: "Produk B", harga: "Rp 200.000", jumlah: 1, total: "Rp 200.000" },
    ],
  };

  return (
    <div className="container">
      <h2>Rincian Pembayaran dari {detailPembayaran.nama}</h2>
      <div className="detail-info">
        <ul>
          <li>
            <strong>ID Pembayaran:</strong> {detailPembayaran.id}
          </li>
          <li>
            <strong>Tanggal Pembayaran:</strong> {detailPembayaran.tanggal}
          </li>
          <li>
            <strong>Jumlah Pembayaran:</strong> {detailPembayaran.jumlah}
          </li>
          <li>
            <strong>Metode Pembayaran:</strong> {detailPembayaran.metode}
          </li>
          <li>
            <strong>Status Pembayaran:</strong>{" "}
            <span
              className={
                detailPembayaran.status === "Lunas"
                  ? "status-lunas"
                  : "status-pending"
              }
            >
              {detailPembayaran.status}
            </span>
          </li>
        </ul>
      </div>
      <h3>Produk yang Dibeli</h3>
      <table>
        <thead>
          <tr>
            <th>Nama Produk</th>
            <th>Harga</th>
            <th>Jumlah</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {detailPembayaran.produk.map((item, index) => (
            <tr key={index}>
              <td>{item.nama}</td>
              <td>{item.harga}</td>
              <td>{item.jumlah}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn btn-secondary"
        onClick={() => navigate("/pembayaran")}
      >
        Kembali
      </button>
    </div>
  );
};

export default DetailPembayaran;
