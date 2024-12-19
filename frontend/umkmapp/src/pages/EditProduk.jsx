import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./css/EditProduk.css";

function EditProduk() {
  const { id } = useParams(); // Mengambil ID produk dari URL
  const navigate = useNavigate();
  const [produk, setProduk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    kategori: "",
    harga: "",
    stok: "",
    status: "",
    gambar: null, // Gambar diubah menjadi null untuk menyimpan file
    previewGambarBaru: null, // Untuk menyimpan URL gambar baru
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Token tidak ditemukan, silakan login terlebih dahulu.");
      setLoading(false);
      return;
    }

    const fetchProduk = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/produk/${id}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Produk tidak ditemukan.");
        }

        const data = await response.json();
        setProduk(data);
        setFormData({
          nama: data.nama,
          kategori: data.kategori,
          harga: data.harga,
          stok: data.stok,
          status: data.status,
          gambar: data.gambar,
          previewGambarBaru: null, // Kosongkan preview awal
        });
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data produk.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduk();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Ambil file yang dipilih
    console.log("File yang dipilih:", file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          gambar: file, // Simpan file
          previewGambarBaru: reader.result, // Simpan URL preview
        }));
      };
      reader.readAsDataURL(file); // Baca file sebagai data URI
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    const formDataToSend = new FormData();
    formDataToSend.append("nama", formData.nama);
    formDataToSend.append("kategori", formData.kategori);
    formDataToSend.append("harga", formData.harga);
    formDataToSend.append("stok", formData.stok);
    formDataToSend.append("status", formData.status);

    if (formData.gambar instanceof File) {
      formDataToSend.append("gambar", formData.gambar); // Tambahkan file baru
    } else {
      formDataToSend.append("gambar_lama", formData.gambar); // Kirim URL gambar lama
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/produk/${id}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const responseData = await response.json();
      console.log("Response Data:", responseData);

      if (!response.ok) {
        throw new Error(responseData.detail || "Gagal memperbarui produk.");
      }

      alert("Produk berhasil diperbarui.");
      navigate("/produk");
    } catch (err) {
      console.error(err.message);
      setError("Terjadi kesalahan saat memperbarui produk.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="Produk-admin">
      <Sidebar />
      <div className="produkisi-admin">
        <Navbar />
        <div className="produk-content">
          <h3 className="judul-produk pb-4 fw-bold">Edit Produk</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="nama">Nama Produk</label>
              <input
                type="text"
                className="form-control"
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="kategori">Kategori</label>
              <input
                type="text"
                className="form-control"
                id="kategori"
                name="kategori"
                value={formData.kategori}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="harga">Harga</label>
              <input
                type="number"
                className="form-control"
                id="harga"
                name="harga"
                value={formData.harga}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="stok">Stok</label>
              <input
                type="number"
                className="form-control"
                id="stok"
                name="stok"
                value={formData.stok}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="status">Status</label>
              <select
                className="form-control"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="Tersedia">Tersedia</option>
                <option value="Tidak Tersedia">Tidak Tersedia</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="gambar">Gambar</label>
              <input
                type="file"
                className="form-control"
                id="gambar"
                name="gambar"
                onChange={handleFileChange}
              />
              <div className="mt-2">
                <p>Preview Gambar:</p>
                {formData.previewGambarBaru ? (
                  <img
                    src={formData.previewGambarBaru}
                    alt="Gambar Baru"
                    style={{ maxWidth: "200px" }}
                  />
                ) : formData.gambar && !(formData.gambar instanceof File) ? (
                  <img
                    src={formData.gambar}
                    alt="Gambar Lama"
                    style={{ maxWidth: "200px" }}
                  />
                ) : (
                  <p>Belum ada gambar yang dipilih</p>
                )}
              </div>
            </div>

            <button type="submit" className="btn btn-success">
              Update Produk
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditProduk;
