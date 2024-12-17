import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
// import Pelanggan from "./pages/Pelanggan";
import Pembayaran from "./pages/Pembayaran";
// import Pengaturan from "./pages/Pengaturan";
// import Pengiriman from "./pages/Pengiriman";
import Penjualan from "./pages/Penjualan";
import ProdukSaya from "./pages/ProdukSaya";
import Signup from "./pages/Signup";
import Supplier from "./pages/Supplier";

import Beranda from "./user/Beranda";
import Checkout from "./user/Checkout";
import Payment from "./user/Payment";
import Shipment from "./user/Shipment";
import Setting from "./user/Setting";
import TambahProduk from "./pages/TambahProduk";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/pelanggan" element={<Pelanggan />} /> */}
        <Route path="/pembayaran" element={<Pembayaran />} />
        {/* <Route path="/pengaturan" element={<Pengaturan />} /> */}
        {/* <Route path="/pengiriman" element={<Pengiriman />} /> */}
        <Route path="/penjualan" element={<Penjualan />} />
        <Route path="/produk" element={<ProdukSaya />} />
        <Route path="/tambahproduk" element={<TambahProduk />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/supplier" element={<Supplier />} />
        
        <Route path="/beranda" element={<Beranda />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/shipment" element={<Shipment />} />
        <Route path="/setting" element={<Setting />} />
        
      </Routes>
    </Router>
  );
}

export default App;
