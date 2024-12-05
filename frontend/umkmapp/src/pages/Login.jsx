import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";
import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Jika sudah ada token, arahkan ke dashboard
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/Penjualan");
    }
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setErrorMessage("Email dan password harus diisi");
      return;
    }
  
    const emailRegex = /\S+@\S+\.\S+/;
    if (email && !emailRegex.test(email)) {
      setErrorMessage("Format email tidak valid");
      return;
    }
  
    const userData = {
      username_or_email: email,  // Pastikan ini sesuai dengan parameter API backend
      password: password,
    };
  
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
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
        navigate("/dashboard");
      } else {
        setErrorMessage(data.detail || "Login gagal: Cek kembali email atau password");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      setErrorMessage("Terjadi kesalahan pada server");
    }
  };

  return (
    <div className="container p-5 rounded">
      <h2 className="text-center">
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
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Logging In..." : "Log In"}
          </button>
        </div>
      </form>

      <div id="make" className="form-text my-4 text-center">
        Don't have an account? <a href="/signup">Sign Up</a>
      </div>
    </div>
  );
}

export default Login;
