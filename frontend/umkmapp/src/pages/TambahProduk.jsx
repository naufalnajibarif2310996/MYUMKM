import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, X, Save, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const TambahProduk = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    kategori: "",
    harga: "",
    stok: "",
    status: "Tersedia",
    gambar: null,
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nama.trim()) {
      newErrors.nama = "Nama produk harus diisi";
    }
    if (!formData.kategori.trim()) {
      newErrors.kategori = "Kategori harus diisi";
    }
    if (!formData.harga || formData.harga <= 0) {
      newErrors.harga = "Harga harus lebih dari 0";
    }
    if (!formData.stok || formData.stok < 0) {
      newErrors.stok = "Stok tidak boleh negatif";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("File harus berupa gambar");
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 5MB");
        return;
      }

      setFormData(prev => ({
        ...prev,
        gambar: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      gambar: null
    }));
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Mohon periksa kembali form Anda");
      return;
    }

    setLoading(true);

    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("Token tidak ditemukan, silakan login kembali");
      navigate("/login");
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append("nama", formData.nama);
      submitData.append("kategori", formData.kategori);
      submitData.append("harga", formData.harga);
      submitData.append("stok", formData.stok);
      submitData.append("status", formData.status);

      if (formData.gambar) {
        submitData.append("gambar", formData.gambar);
      }

      const response = await fetch("http://127.0.0.1:8000/produk/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: submitData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Produk berhasil ditambahkan!");
        navigate("/produk");
      } else {
        if (data.code === "token_not_valid") {
          toast.error("Token tidak valid, silakan login ulang");
          localStorage.removeItem("access_token");
          navigate("/login");
        } else {
          toast.error(data.detail || "Terjadi kesalahan, coba lagi");
        }
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Terjadi kesalahan pada server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/produk")}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Tambah Produk Baru
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Lengkapi informasi produk yang akan ditambahkan
            </p>
          </div>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gambar Produk
              </label>
              
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary-500 dark:hover:border-primary-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Klik untuk upload gambar atau drag & drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    PNG, JPG, JPEG hingga 5MB
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Product Name */}
            <Input
              label="Nama Produk"
              name="nama"
              value={formData.nama}
              onChange={handleInputChange}
              error={errors.nama}
              placeholder="Masukkan nama produk"
              required
            />

            {/* Category */}
            <Input
              label="Kategori"
              name="kategori"
              value={formData.kategori}
              onChange={handleInputChange}
              error={errors.kategori}
              placeholder="Masukkan kategori produk"
              required
            />

            {/* Price and Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Harga"
                name="harga"
                type="number"
                value={formData.harga}
                onChange={handleInputChange}
                error={errors.harga}
                placeholder="0"
                required
              />
              
              <Input
                label="Stok"
                name="stok"
                type="number"
                value={formData.stok}
                onChange={handleInputChange}
                error={errors.stok}
                placeholder="0"
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="input-field"
                required
              >
                <option value="Tersedia">Tersedia</option>
                <option value="Habis">Habis</option>
              </select>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/produk")}
                disabled={loading}
              >
                Batal
              </Button>
              <Button
                type="submit"
                loading={loading}
                disabled={loading}
              >
                <Save className="w-4 h-4 mr-2" />
                Simpan Produk
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
};

export default TambahProduk;