import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Reset error message if user modifies input
    setErrorMessage("");

    // Validasi confirm password
    if (password !== Cpassword) {
      setErrorMessage("Password dan Confirm Password tidak cocok.");
      return;
    }

    // Validasi email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Email tidak valid.");
      return;
    }

    // Validasi password panjang minimal 6 karakter
    if (password.length < 6) {
      setErrorMessage("Password harus memiliki minimal 6 karakter.");
      return;
    }

    const userData = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert("Akun berhasil dibuat!");
        navigate("/login");
      } else {
        const data = await response.json();
        setErrorMessage(data.error || "Registrasi gagal");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Terjadi kesalahan pada server");
    }
  };

  // Disable button if fields are empty or error message exists
  const isFormValid =
    username && email && password && Cpassword && !errorMessage;

  return (
    <div className="container p-5 rounded">
      <h2 className="text-center">
        <b>Sign Up</b>
      </h2>
      <form onSubmit={handleSignup}>
        {/* Username */}
        <div className="mb-2">
          <label htmlFor="username" className="form-label pt-3">
            Username
          </label>
          <input
            type="text"
            className={`form-control ${
              errorMessage && !username ? "is-invalid" : ""
            }`}
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label pt-3">
            Email address
          </label>
          <input
            type="email"
            className={`form-control ${
              errorMessage && !email ? "is-invalid" : ""
            }`}
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${
              errorMessage && password.length < 6 ? "is-invalid" : ""
            }`}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-5">
          <label htmlFor="Cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className={`form-control ${
              errorMessage && password !== Cpassword ? "is-invalid" : ""
            }`}
            id="Cpassword"
            value={Cpassword}
            onChange={(e) => setCPassword(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div className="d-grid gap-2 pb-3">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={!isFormValid} // Disable submit button if form is invalid
          >
            Sign Up
          </button>
        </div>
      </form>

      {/* Error Message */}
      {errorMessage && (
        <div className="alert alert-danger" role="alert" aria-live="assertive">
          {errorMessage}
        </div>
      )}

      {/* Link to Login */}
      <div id="make" className="form-text my-4 text-center">
        Already have an account? <a href="/login">Log in</a>
      </div>
    </div>
  );
}

export default Signup;
