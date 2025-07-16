import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import SidebarContent from "./sidebars/SidebarContent";

export default function Sidebar({ profileImage, Username }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleItemClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white p-2 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-300 hover:shadow-xl"
          aria-label="Toggle menu"
        >
          <Menu size={24} className="text-gray-700" />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:h-screen p-6 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-sm space-y-6 items-center transition-all duration-300">
        <SidebarContent profileImage={profileImage} Username={Username} handleItemClick={handleItemClick} />
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 w-72 h-screen bg-white shadow-xl transform transition-all duration-300 z-40 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <SidebarContent profileImage={profileImage} Username={Username} handleItemClick={handleItemClick} />
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

