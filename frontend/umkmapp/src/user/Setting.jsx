import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Setting() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [password, setPassword] = useState("");

  const handleSaveChanges = () => {
    // Validasi dan simulasikan penyimpanan perubahan
    if (!name || !email || !password) {
      alert("Semua kolom harus diisi!");
      return;
    }

    alert("Perubahan berhasil disimpan!");
  };

  return (
    <div className="dashboard-layout d-flex" style={{ height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      <div className="dashboard-content flex-grow-1 d-flex flex-column">
        {/* Navbar */}
        <Navbar />

        <div className="main-content d-flex flex-column align-items-center justify-content-center p-4">
          <h2 className="text-center mb-4 text-primary">Pengaturan Akun</h2>

          {/* Formulir Pengaturan */}
          <div className="settings-form" style={{ maxWidth: "800px", width: "100%" }}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nama
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Kata Sandi
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Tombol Simpan */}
            <button className="btn btn-primary mt-4" onClick={handleSaveChanges}>
              Simpan Perubahan
            </button>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Setting;
