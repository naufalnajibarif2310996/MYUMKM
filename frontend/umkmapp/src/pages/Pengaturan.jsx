import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./css/Pengaturan.css";

function Pengaturan() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [error, setError] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Token tidak ditemukan, silakan login terlebih dahulu.");
      return;
    }

    const data = { username, password };

    try {
      const response = await fetch("http://127.0.0.1:8000/user/profile/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Gagal memperbarui profil.");
      }

      alert("Profil berhasil diperbarui.");
      navigate("/dashboard");  // Mengarahkan kembali ke halaman dashboard atau halaman lain
    } catch (err) {
      setError("Terjadi kesalahan saat memperbarui profil.");
    }
  };

  return (
    <div className="Pengaturan">
      <Sidebar />
      <div className="pengaturan-content">
        <Navbar />
        <div className="content">
          <h3 className="judul-pengaturan pb-4 fw-bold">Pengaturan Profil</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Konfirmasi Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Mode</label>
              <select
                className="form-control"
                value={theme}
                onChange={handleThemeChange}
              >
                <option value="light">Terang</option>
                <option value="dark">Gelap</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary my-5">
              Simpan Perubahan
            </button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Pengaturan;
