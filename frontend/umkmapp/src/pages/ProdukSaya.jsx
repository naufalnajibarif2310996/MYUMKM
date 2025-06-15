import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import Table from "../components/ui/Table";
import SearchBar from "../components/ui/SearchBar";
import Pagination from "../components/ui/Pagination";
import Modal from "../components/ui/Modal";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const ProdukSaya = () => {
  const navigate = useNavigate();
  const [produkList, setProdukList] = useState([]);
  const [filteredProduk, setFilteredProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, produk: null });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchProduk();
  }, []);

  useEffect(() => {
    filterProduk();
  }, [produkList, searchTerm, filters]);

  const fetchProduk = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Token tidak ditemukan, silakan login terlebih dahulu.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/produk/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        toast.error("Sesi Anda telah berakhir, silakan login ulang.");
        localStorage.removeItem("access_token");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setProdukList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Kesalahan mengambil data:", err.message);
      setError("Terjadi kesalahan saat mengambil data produk.");
      toast.error("Gagal memuat data produk");
    } finally {
      setLoading(false);
    }
  };

  const filterProduk = () => {
    let filtered = produkList;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(produk =>
        produk.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        produk.kategori.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Additional filters
    if (filters.status) {
      filtered = filtered.filter(produk => produk.status === filters.status);
    }
    if (filters.kategori) {
      filtered = filtered.filter(produk => produk.kategori === filters.kategori);
    }

    setFilteredProduk(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(`http://127.0.0.1:8000/produk/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setProdukList(produkList.filter((produk) => produk.id !== id));
      setDeleteModal({ isOpen: false, produk: null });
      toast.success("Produk berhasil dihapus");
    } catch (err) {
      console.error("Kesalahan menghapus produk:", err.message);
      toast.error("Terjadi kesalahan saat menghapus produk");
    }
  };

  const openDeleteModal = (produk) => {
    setDeleteModal({ isOpen: true, produk });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, produk: null });
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredProduk.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProduk = filteredProduk.slice(startIndex, endIndex);

  // Filter options
  const filterOptions = [
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'Tersedia', label: 'Tersedia' },
        { value: 'Habis', label: 'Habis' }
      ]
    },
    {
      key: 'kategori',
      label: 'Kategori',
      type: 'select',
      options: [...new Set(produkList.map(p => p.kategori))].map(kategori => ({
        value: kategori,
        label: kategori
      }))
    }
  ];

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Produk Saya
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Kelola semua produk Anda
            </p>
          </div>
          <Button onClick={() => navigate("/tambahproduk")}>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Produk
          </Button>
        </div>

        {/* Search and Filters */}
        <SearchBar
          onSearch={setSearchTerm}
          onFilter={setFilters}
          placeholder="Cari produk..."
          filters={filterOptions}
        />

        {/* Products Table */}
        <div className="card">
          {currentProduk.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm || Object.keys(filters).length > 0 
                  ? "Tidak ada produk yang sesuai dengan pencarian"
                  : "Belum ada produk, silakan tambahkan produk baru"
                }
              </p>
              {!searchTerm && Object.keys(filters).length === 0 && (
                <Button 
                  className="mt-4" 
                  onClick={() => navigate("/tambahproduk")}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Produk Pertama
                </Button>
              )}
            </div>
          ) : (
            <>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.Head>No</Table.Head>
                    <Table.Head>Gambar</Table.Head>
                    <Table.Head>Nama Produk</Table.Head>
                    <Table.Head>Kategori</Table.Head>
                    <Table.Head>Harga</Table.Head>
                    <Table.Head>Stok</Table.Head>
                    <Table.Head>Status</Table.Head>
                    <Table.Head>Aksi</Table.Head>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {currentProduk.map((produk, index) => (
                    <motion.tr
                      key={produk.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="table-row"
                    >
                      <Table.Cell>{startIndex + index + 1}</Table.Cell>
                      <Table.Cell>
                        <img
                          src={produk.gambar}
                          alt={produk.nama}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {produk.nama}
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
                          {produk.kategori}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="font-medium">
                          Rp {produk.harga.toLocaleString()}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          produk.stok > 10 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : produk.stok > 0
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {produk.stok}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          produk.status === 'Tersedia'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {produk.status}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/editproduk/${produk.id}`)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openDeleteModal(produk)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </Table.Cell>
                    </motion.tr>
                  ))}
                </Table.Body>
              </Table>

              {/* Pagination */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  totalItems={filteredProduk.length}
                />
              </div>
            </>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={deleteModal.isOpen}
          onClose={closeDeleteModal}
          title="Konfirmasi Hapus"
          size="sm"
        >
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Apakah Anda yakin ingin menghapus produk "{deleteModal.produk?.nama}"? 
              Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="secondary" onClick={closeDeleteModal}>
                Batal
              </Button>
              <Button 
                variant="danger" 
                onClick={() => handleDelete(deleteModal.produk.id)}
              >
                Hapus
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default ProdukSaya;