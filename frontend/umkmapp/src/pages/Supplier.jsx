import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Supplier.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";


const Supplier = () => {
  const navigate = useNavigate();

  const handleTambahSupplier = () => {
    navigate("/tambahsupplier");
  };

  return (
    <div className="supplier-page">
      <Navbar/>
      <Sidebar/>
      <table className="supplier-table">
        <thead>
          <tr>
            <th>ID Supplier</th>
            <th>Nama Supplier</th>
            <th>Alamat</th>
            <th>Email</th>
            <th>Telepon</th>
            <th>Produk</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>S001</td>
            <td>Supplier A</td>
            <td>Jl. Raya No. 10, Jakarta</td>
            <td>supplierA@example.com</td>
            <td>081234567890</td>
            <td>Produk A, Produk B</td>
            <td>Aktif</td>
          </tr>
          <tr>
            <td>S002</td>
            <td>Supplier B</td>
            <td>Jl. Merdeka No. 25, Bandung</td>
            <td>supplierB@example.com</td>
            <td>082345678901</td>
            <td>Produk C, Produk D</td>
            <td>Non-Aktif</td>
          </tr>
        </tbody>
      </table>
      <button className="btn-tambah-supplier mt-5" onClick={handleTambahSupplier}>
        🛒 Tambahkan Supplier
      </button>
      <Footer/>
    </div>
  );
};

export default Supplier;
