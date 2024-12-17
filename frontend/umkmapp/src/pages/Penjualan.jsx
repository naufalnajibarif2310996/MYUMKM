import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Penjualan.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Penjualan() {
  const navigate = useNavigate();
  // const [namaProduk, setNamaProduk] = useState("");
  // const [status, setStatus] = useState("");
  // const [kategori, setKategori] = useState("");
  // const [harga, setHarga] = useState("");
  // const [stok, setStok] = useState("");
  // const [message, setMessage] = useState("");

  return (
    <div className="penjualan-layout">
      <Sidebar />
      <div className="penjualan-content">
        <Navbar />
        <div className="main-content">
        <button className="btn btn-primary">Tambah Pesanan</button>
        </div>
      </div>
      <Footer /> {/* Tambahkan Footer */}
    </div>
  );
}
export default Penjualan;
