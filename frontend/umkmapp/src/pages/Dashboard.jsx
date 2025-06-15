import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Package, 
  Users, 
  TrendingUp, 
  DollarSign,
  ShoppingCart,
  AlertCircle
} from "lucide-react";
import Layout from "../components/layout/Layout";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const StatCard = ({ title, value, icon: Icon, color, trend, loading }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <div className="flex items-center mt-2">
            {loading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {value}
              </p>
            )}
            {trend && (
              <span className={`ml-2 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
            )}
          </div>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalSales: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Anda harus login terlebih dahulu.");
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [productsRes, usersRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/produk/", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch("http://127.0.0.1:8000/users/", {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        if (!productsRes.ok || !usersRes.ok) {
          throw new Error("Gagal mengambil data");
        }

        const [products, users] = await Promise.all([
          productsRes.json(),
          usersRes.json()
        ]);

        setStats({
          totalProducts: products.length,
          totalUsers: users.length,
          totalSales: 156, // Mock data
          totalRevenue: 2450000 // Mock data
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const statCards = [
    {
      title: "Total Produk",
      value: stats.totalProducts,
      icon: Package,
      color: "bg-blue-500",
      trend: 12
    },
    {
      title: "Total Pengguna",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-green-500",
      trend: 8
    },
    {
      title: "Penjualan Bulan Ini",
      value: stats.totalSales,
      icon: ShoppingCart,
      color: "bg-purple-500",
      trend: -3
    },
    {
      title: "Pendapatan",
      value: `Rp ${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-yellow-500",
      trend: 15
    }
  ];

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Selamat Datang di Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Kelola bisnis UMKM Anda dengan mudah dan efisien
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatCard {...stat} loading={loading} />
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Aksi Cepat
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/tambahproduk')}
              className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 dark:hover:border-primary-400 transition-colors group"
            >
              <Package className="w-8 h-8 text-gray-400 group-hover:text-primary-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-primary-500">
                Tambah Produk Baru
              </p>
            </button>
            
            <button
              onClick={() => navigate('/pelanggan')}
              className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 dark:hover:border-primary-400 transition-colors group"
            >
              <Users className="w-8 h-8 text-gray-400 group-hover:text-primary-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-primary-500">
                Lihat Pelanggan
              </p>
            </button>
            
            <button
              onClick={() => navigate('/penjualan')}
              className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 dark:hover:border-primary-400 transition-colors group"
            >
              <TrendingUp className="w-8 h-8 text-gray-400 group-hover:text-primary-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-primary-500">
                Laporan Penjualan
              </p>
            </button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Dashboard;