import { Link, useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { LogOut, BarChart, Wallet, Home, User, Settings, Plus } from "lucide-react";
import { useState } from "react";
import PopUp from "../inputs/PopUp";


export default function SidebarContent({ profileImage, Username, handleItemClick }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Profile Section */}
      <div className="flex flex-col items-center space-y-3 pt-6 pb-8 px-4 border-b border-gray-100">
        <div className="relative group">
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-blue-100 transition-all duration-300" />
        </div>
        <p className="font-semibold text-xl text-gray-800">{Username}</p>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
            <Settings size={18} className="text-gray-600" />
          </button>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
            <User size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 mt-4 space-y-1 px-2 overflow-y-auto">
        <Link to="/" className="block">
          <SidebarItem
            icon={<Home size={20} />}
            label="Dashboard"
            onClick={handleItemClick}
            active={isActive("/")}
          />
        </Link>
        <Link to="/dashboard/income" className="block">
          <SidebarItem
            icon={<Wallet size={20} />}
            label="Income"
            onClick={handleItemClick}
            active={isActive("/dashboard/income")}
          />
        </Link>
        <Link to="/dashboard/expense" className="block">
          <SidebarItem
            icon={<BarChart size={20} />}
            label="Expense"
            onClick={handleItemClick}
            active={isActive("/dashboard/expense")}
          />
        </Link>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-100">
        <SidebarItem
          icon={<LogOut size={20} />}
          label="Logout"
          onClick={() => {
            // handleItemClick();
            return setShowLogoutModal(true);
          }}
          isLogout
        />

        {showLogoutModal && (
          <PopUp
            title="Confirm Logout"
            message="Are you sure you want to logout?"
            icon={<LogOut size={20} />}
            confirmColor="red"
            confirmText="Logout"
            onConfirm={() => {
              // logout logic here
              localStorage.removeItem('token');
              window.location.href = '/login'; // Redirect to login page
              setShowLogoutModal(false);
            }}
            onCancel={() => setShowLogoutModal(false)}
          />
        )}
      </div>
    </div>
  );
}