import { ChevronRight } from "lucide-react";

export default function SidebarItem({ icon, label, onClick, active = false, isLogout = false }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group ${
        active 
          ? "bg-blue-50 text-blue-600" 
          : isLogout 
            ? "text-red-500 hover:bg-red-50" 
            : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`transition ${
          active 
            ? "text-blue-600" 
            : isLogout 
              ? "text-red-500" 
              : "text-gray-500 group-hover:text-blue-600"
        }`}>
          {icon}
        </div>
        <span className={`font-medium ${
          isLogout ? "group-hover:text-red-600" : "group-hover:text-blue-600"
        }`}>
          {label}
        </span>
      </div>
      {!isLogout && (
        <ChevronRight 
          size={16} 
          className={`transition-transform duration-200 ${
            active ? "text-blue-400" : "text-gray-400"
          } group-hover:translate-x-1`} 
        />
      )}
    </div>
  );
}