import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./css/Sidebar.css";
import Logo from "../assets/image-2.png";

function SidebarAdmin({ setPageTitle }) {
  const location = useLocation(); // Untuk mendapatkan URL saat ini
  const [activeItem, setActiveItem] = useState("");

  const menuItems = [
    { name: "Halaman Utama", icon: "🏠", path: "/dashboard" },
    { name: "Produk Saya", icon: "🛍️", path: "/produk" },
    { name: "Penjualan", icon: "💰", path: "/penjualan" },
    { name: "Pelanggan", icon: "👥", path: "/pelanggan" },
    { name: "Supplier", icon: "🚚", path: "/supplier" },
    { name: "Pembayaran", icon: "💳", path: "/pembayaran" },
    { name: "Pengiriman", icon: "📦", path: "/pengiriman" },
    { name: "Pengaturan", icon: "⚙️", path: "/pengaturan" },
  ];

  // Update activeItem berdasarkan URL saat ini
  useEffect(() => {
    const currentItem = menuItems.find((item) => item.path === location.pathname);
    if (currentItem) {
      setActiveItem(currentItem.name);
      if (setPageTitle) setPageTitle(currentItem.name); // Update judul di Navbar jika fungsi disediakan
    }
  }, [location.pathname, setPageTitle, menuItems]);

  return (
    <div className="sidebar-admin">
      <div className="sidebar-header-admin sticky-top">
        <img src={Logo} alt="Logo" className="sidebar-logo-admin" />
      </div>
      <ul className="sidebar-menu-admin">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`sidebar-item-admin ${activeItem === item.name ? "active" : ""}`}
          >
            <Link
              to={item.path}
              className="sidebar-link-admin"
            >
              <span className="sidebar-icon-admin">{item.icon}</span>
              <span className="sidebar-text-admin">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarAdmin;
