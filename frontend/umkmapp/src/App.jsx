import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Penjualan from "./pages/Penjualan";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route untuk Login */}
        <Route path="/login" element={<Login />} />

        {/* Route untuk Signup */}
        <Route path="/signup" element={<Signup />} />

        {/* Route untuk Penjualan */}
        <Route path="/penjualan" element={<Penjualan />} />
      </Routes>
    </Router>
  );
}

export default App;
