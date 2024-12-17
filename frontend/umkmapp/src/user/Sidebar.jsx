import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/image-2.png"
import "./css/Sidebar.css";

function Sidebar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const menuItems = [
    { name: "Beranda", icon: "🏠", path: "/beranda" },
    { name: "Checkout", icon: "💰", path: "/checkout" },
    { name: "Payment", icon: "💳", path: "/payment" },
    { name: "Shipment", icon: "📦", path: "/shipment" },
    { name: "Setting", icon: "⚙️", path: "/setting" },
  ];

  const handleSetActive = (path) => {
    setActiveItem(path);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={Logo} alt="Logo" className="sidebar-logo" />
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={`sidebar-item ${
              activeItem === item.path ? "active" : ""
            }`}
          >
            <Link
              to={item.path}
              className="sidebar-link d-flex align-items-center"
              onClick={() => handleSetActive(item.path)}
            >
              <span className="sidebar-icon me-2">{item.icon}</span>{" "}
              <span className="sidebar-text">{item.name}</span>{" "}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
