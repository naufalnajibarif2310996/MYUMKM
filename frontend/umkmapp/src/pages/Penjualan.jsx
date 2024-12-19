import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Penjualan.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Penjualan() {
  // const navigate = useNavigate();
  // const [namaProduk, setNamaProduk] = useState("");
  // const [status, setStatus] = useState("");
  // const [kategori, setKategori] = useState("");
  // const [harga, setHarga] = useState("");
  // const [stok, setStok] = useState("");
  // const [message, setMessage] = useState("");

  const dataPenjualan = [
    {
      id: "1",
      jumlah: "2",
      total: "200.000",
      tanggal: "15 Desember 2024",
      status: "Lunas",
    },
    {
      id: "2",
      jumlah: "6",
      total: "600.000",
      tanggal: "12 Desember 2024",
      status: "Belum Lunas",
    },
  ];

  return (
    <div className="penjualan-layout">
      <Sidebar />
      <div className="penjualan-content">
        <Navbar />
        <div className="main-content">
        <table>
            <thead>
              <tr>
                <th>ID Penjualan</th>
                <th>Jumlah Pembelian</th>
                <th>Total Pembelian</th>
                <th>Tanggal Pembayaran</th>
                <th>Status Pembayaran</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataPenjualan.map((penjualan) => (
                <tr key={penjualan.id}>
                  <td>{penjualan.id}</td>
                  <td>{penjualan.jumlah}</td>
                  <td>{penjualan.total}</td>
                  <td>{penjualan.tanggal}</td>
                  <td
                    className={
                      penjualan.status === "Lunas"
                        ? "status-lunas"
                        : "status-belum-lunas"
                    }
                  >
                    {penjualan.status}
                  </td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => handleDetailPenjualan(penjualan.id)}
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
      <Footer /> {/* Tambahkan Footer */}
    </div>
  );
}
export default Penjualan;
