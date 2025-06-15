import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, Search, Moon, Sun, LogOut, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../ui/Button';
import Breadcrumb from '../ui/Breadcrumb';

const Navbar = ({ sidebarCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const getBreadcrumbItems = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const items = [];
    
    const pathMap = {
      'dashboard': 'Dashboard',
      'produk': 'Produk',
      'penjualan': 'Penjualan',
      'pelanggan': 'Pelanggan',
      'supplier': 'Supplier',
      'pembayaran': 'Pembayaran',
      'pengiriman': 'Pengiriman',
      'pengaturan': 'Pengaturan',
      'tambahproduk': 'Tambah Produk',
      'editproduk': 'Edit Produk'
    };

    pathSegments.forEach((segment, index) => {
      const isLast = index === pathSegments.length - 1;
      const label = pathMap[segment] || segment;
      
      if (!isLast) {
        items.push({
          label,
          href: '/' + pathSegments.slice(0, index + 1).join('/')
        });
      } else {
        items.push({ label });
      }
    });

    return items;
  };

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      navigate("/login");
    }
  };

  return (
    <header 
      className={`fixed top-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-20 transition-all duration-300 ${
        sidebarCollapsed ? 'left-20' : 'left-70'
      }`}
      style={{ left: sidebarCollapsed ? '80px' : '280px' }}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Breadcrumb */}
        <div className="flex-1">
          <Breadcrumb items={getBreadcrumbItems()} />
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Quick search..."
              className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </Button>

          {/* Theme toggle */}
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          {/* Profile dropdown */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Admin</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
            </div>
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Logout */}
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;