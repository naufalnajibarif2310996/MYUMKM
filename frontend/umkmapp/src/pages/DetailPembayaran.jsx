import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./css/DetailPembayaran.css";
import Sidebar from "./Sidebar"; // Import Sidebar
import Navbar from "./Navbar";   // Import Navbar

const PembayaranDetail = () => {
  const { id } = useParams(); // Ambil parameter ID dari URL
  const navigate = useNavigate();

  // Dummy Data Pembayaran
  const pembayaran = {
    P001: { nama: "John Doe", tanggal: "15 Desember 2024", jumlah: "Rp 500.000", metode: "Transfer Bank", status: "Lunas" },
    P002: { nama: "Jane Smith", tanggal: "16 Desember 2024", jumlah: "Rp 750.000", metode: "E-Wallet", status: "Pending" },
  };

  const data = pembayaran[id] || {};

  return (
    <div className="container">
      {/* Sidebar */}
      <Sidebar />

      <div className="main-content">
        {/* Navbar */}
        <Navbar />

        <div className="detail-container">
          <h2>Rincian Pembayaran dari {data.nama}</h2>
          <div className="detail-card">
            <table>
              <tbody>
                <tr>
                  <td>ID Pembayaran</td>
                  <td>{id}</td>
                </tr>
                <tr>
                  <td>Tanggal Pembayaran</td>
                  <td>{data.tanggal}</td>
                </tr>
                <tr>
                  <td>Jumlah Pembayaran</td>
                  <td>{data.jumlah}</td>
                </tr>
                <tr>
                  <td>Metode Pembayaran</td>
                  <td>{data.metode}</td>
                </tr>
                <tr>
                  <td>Status Pembayaran</td>
                  <td className={data.status === "Lunas" ? "status-lunas" : "status-pending"}>
                    {data.status}
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="btn-back" onClick={() => navigate("/pembayaran")}>
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PembayaranDetail;
