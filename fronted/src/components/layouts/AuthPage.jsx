// AuthPage.jsx
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import DecoratedPanel from "../DecoratedPanel";
import SignUp from "../../../pages/Auth/SignUp";
import Login from "../../../pages/Auth/Login";

export default function AuthPage() {
  const location = useLocation();
  const isSignup = location.pathname === "/signup";

  return (
    <div className="flex flex-col-reverse md:flex-row min-h-screen bg-white">
      {/* Left side: SignUp or Login */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full md:w-1/2 lg:w-2/5 xl:w-1/2 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8"
      >
        <div className="w-full max-w-md mx-auto">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-100 rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">
            Expense Tracker
          </h1>

          <p className="text-gray-600 text-center mb-8">
            Manage your finances effortlessly
          </p>

          <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm w-full">
            {isSignup ? <SignUp /> : <Login />}
          </div>
        </div>
      </motion.div>

      {/* Right side: Decorative panel */}
      <DecoratedPanel />
    </div>
  );
}
