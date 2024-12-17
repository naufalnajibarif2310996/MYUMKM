import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import "./css/Login.css";
import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  // Validasi form secara real-time
  const isFormValid = email.trim() !== "" && password.trim() !== "";

  useEffect(() => {
    // Menambahkan kelas khusus untuk halaman login
    document.body.classList.add("login-page");

    // Membersihkan kelas setelah komponen unmount
    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  const login = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      setErrorMessage("Email/Username dan Password harus diisi");
      return;
    }

    const userData = {
      username_or_email: email, // Pastikan sesuai dengan parameter backend API
      password: password,
    };

    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      setLoading(false);

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        alert("Login sukses!");
        
        // Ambil redirect_url dari respons dan arahkan ke sana
        const redirectUrl = data.redirect_url || "/";  // Default redirect ke homepage jika tidak ada redirect_url
        window.location.href = redirectUrl;  // Gunakan window.location.href untuk redirect
      } else {
        setErrorMessage(
          data.detail || "Login gagal: Cek kembali username/email atau password"
        );
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      setErrorMessage("Terjadi kesalahan pada server");
    }
  };

  return (
    <div className="container-login rounded">
      <div className="row-login">
        <div className="col">
          <h2 className="text-center pb-3">
            <b>Log In</b>
          </h2>
          <form onSubmit={login}>
            <div className="mb-3">
              <label htmlFor="username_or_email" className="form-label pt-3">
                Email address or Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username_or_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            {errorMessage && (
              <div
                className="alert alert-danger"
                role="alert"
                aria-live="assertive"
              >
                {errorMessage}
              </div>
            )}

            <div id="Forgot" className="form-text mb-3 text-end">
              <a href="/forgot-password">Forgot Password</a>
            </div>
            <div className="d-grid gap-2 pb-3">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={!isFormValid || loading}
              >
                {loading ? "Logging In..." : "Log In"}
              </button>
            </div>
          </form>

          <div id="make" className="form-text my-4 text-center">
            Don't have an account? <a href="/signup">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
