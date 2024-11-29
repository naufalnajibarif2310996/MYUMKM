import { useState } from "react";
import "./css/Login.css"
import "../App.css"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    const User = { email, password };

    fetch("http://127.0.0.1:8000/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(User),
    })
      .then((data) => {
        setEmail("");  
        setPassword("");  
        alert("Pendaftaran berhasil!");  
      })
      .catch((error) => {
        alert("Pendaftaran gagal!"); 
      });
  };

  return (
    <div className="container p-5 rounded">
      <h2 className="text-center">
        <b>Log In</b>
      </h2>
      <form method="post" onSubmit={login}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label pt-3">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password} // Menghubungkan input ke state password
            onChange={(e) => setPassword(e.target.value)} // Memperbarui state password saat input berubah
          />
        </div>
        <div id="Forgot" className="form-text mb-3 text-end">
          <a href="#">Forgot Password</a>
        </div>
        <div className="d-grid gap-2 pb-3">
          <button className="btn btn-primary" type="submit">
            Log In
          </button>
        </div>
      </form>

      <div id="make" className="form-text my-4 text-center">
        Don't have an account? <a href="#">Sign Up</a>
      </div>
    </div>
  );
};

export default Login;