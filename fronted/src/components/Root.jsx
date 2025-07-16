// src/pages/Root.jsx
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Root() {
  const isAuthenticated = localStorage.getItem("token");
  const expiry = localStorage.getItem('tokenExpiry');
   const isExpired = expiry && Date.now() > parseInt(expiry);
  // Check if the user is authenticated
  console.log('the value of the isAuthenticated:', isAuthenticated);

  if (!isAuthenticated || isExpired) {
    console.log('Hello world')
    return <Navigate to="/login" replace/>;
  }
  const profileImage = localStorage.getItem("profileImage");
  const Username = localStorage.getItem("Username");
  console.log('the value of the profileImage:', profileImage);
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar (always shown) */}
      <Sidebar profileImage={profileImage} Username={Username}/>

      {/* Right content changes based on the nested route */}
      <div className="flex-1 p-6 space-y-6">
        <Outlet />
      </div>
    </div>
  );
}
