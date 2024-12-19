import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Setting() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data dummy pengguna
  const dummyUserData = {
    username: "Najib",
    email: "Najib@example.com",
  };

  useEffect(() => {
    setLoading(false);
    setUserData(dummyUserData); // Menggunakan data dummy
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard-layout d-flex" style={{ height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      <div className="dashboard-content flex-grow-1 d-flex flex-column">
        {/* Navbar */}
        <Navbar />

        <div className="main-content d-flex flex-column align-items-center justify-content-center">
          <h2 className="text-center mb-4 text-primary">Pengaturan Akun</h2>

          {/* Card untuk Menampilkan Data Pengguna */}
          <div
            className="card"
            style={{
              maxWidth: "800px",
              width: "100%",
              overflow: "hidden",
              height: "100%",
            }}
          >
            <div className="card-body " 
              style={{
                width : "100%" }}>
              
              <h5 className="card-title" >
                {userData?.username}
              </h5>

              {/* Menampilkan Email pada satu baris penuh */}
              <p
                className="card-text"
               
              >
                <strong>Email: </strong> {userData?.email}
              </p>

              {/* Button Edit Profil */}
              <div className="d-flex justify-content-center mt-4">
                <button
                  className="btn btn-warning"
                  onClick={() => navigate("/edit-profile")}  // Navigasi ke halaman edit profil
                >
                  Edit Profil
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Setting;
