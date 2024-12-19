import React from 'react';
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import './css/Pengiriman.css'; // Import file CSS

const dataPengiriman = [
    { id: 'P001', nama: 'John Doe', produk: 'Produk A', alamat: 'Jl. Merdeka No. 10, Jakarta', status: 'Terkirim', tanggal: '16 Desember 2024' },
    { id: 'P002', nama: 'Jane Smith', produk: 'Produk B', alamat: 'Jl. Sudirman No. 5, Surabaya', status: 'Menunggu', tanggal: '17 Desember 2024' },
];

const DaftarPengiriman = () => {
    return (
        <div className="daftar-pengiriman">
            <Navbar />
            <Sidebar />
            <table>
                <thead>
                    <tr>
                        <th>ID Pengiriman</th>
                        <th>Nama Pelanggan</th>
                        <th>Produk</th>
                        <th>Alamat Pengiriman</th>
                        <th>Status</th>
                        <th>Tanggal</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {dataPengiriman.map((pengiriman) => (
                        <tr key={pengiriman.id}>
                            <td>{pengiriman.id}</td>
                            <td>{pengiriman.nama}</td>
                            <td>{pengiriman.produk}</td>
                            <td>{pengiriman.alamat}</td>
                            <td>{pengiriman.status}</td>
                            <td>{pengiriman.tanggal}</td>
                            <td><button className='btn btn-primary'>Detail</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DaftarPengiriman;