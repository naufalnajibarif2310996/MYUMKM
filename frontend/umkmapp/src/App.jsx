import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext";

// Admin Pages
import Dashboard from "./pages/Dashboard";
import ProdukSaya from "./pages/ProdukSaya";
import TambahProduk from "./pages/TambahProduk";
import EditProduk from "./pages/EditProduk";
import Pelanggan from "./pages/Pelanggan";
import Pembayaran from "./pages/Pembayaran";
import Pengaturan from "./pages/Pengaturan";
import Pengiriman from "./pages/Pengiriman";
import Penjualan from "./pages/Penjualan";
import Supplier from "./pages/Supplier";

// Public Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// User Pages
import Beranda from "./user/Beranda";
import Checkout from "./user/Checkout";
import Payment from "./user/Payment";
import Shipment from "./user/Shipment";
import Setting from "./user/Setting";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Admin Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/produk" element={<ProdukSaya />} />
          <Route path="/tambahproduk" element={<TambahProduk />} />
          <Route path="/editproduk/:id" element={<EditProduk />} />
          <Route path="/pelanggan" element={<Pelanggan />} />
          <Route path="/pembayaran" element={<Pembayaran />} />
          <Route path="/pengaturan" element={<Pengaturan />} />
          <Route path="/pengiriman" element={<Pengiriman />} />
          <Route path="/penjualan" element={<Penjualan />} />
          <Route path="/supplier" element={<Supplier />} />
          
          {/* User Routes */}
          <Route path="/beranda" element={<Beranda />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/shipment" element={<Shipment />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;