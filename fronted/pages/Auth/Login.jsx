import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "../../src/components/inputs/Input";
import toast, { Toaster } from "react-hot-toast";
import PopUp from "../../src/components/inputs/PopUp";
import { Lock } from "lucide-react";
import getPasswordStrength from "../../utils/Logout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setError("");
    setLoading(true); // show loader

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("profileImage", data.user.profileImage);
        localStorage.setItem("Username", data.user.userName);
        localStorage.setItem(
          "tokenExpiry",
          (Date.now() + 60 * 60 * 1000).toString()
        );
        toast.success("Login successful");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false); // hide loader
    }
  };

  const strength = getPasswordStrength(password);

  return (
    <>
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Sign In to your account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <Input
          value={email}
          label="Email Address"
          onChange={({ target }) => setEmail(target.value)}
          type="email"
          placeholder="you@example.com"
        />

        <Input
          value={password}
          label="Password"
          onChange={({ target }) => setPassword(target.value)}
          type="password"
          placeholder="••••••••"
        />

        <div className="text-sm text-right">
          <button
            type="button"
            onClick={() => setShowForgotModal(true)}
            className="text-indigo-600 hover:text-indigo-500 text-xs"
          >
            Forgot password?
          </button>
        </div>

        {password && (
          <div className="text-sm mt-1">
            <span
              className={`font-medium ${
                strength === "Weak"
                  ? "text-red-500"
                  : strength === "Medium"
                  ? "text-yellow-500"
                  : "text-green-600"
              }`}
            >
              Password strength: {strength}
            </span>
          </div>
        )}

        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
            Remember me
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition shadow-md hover:shadow-lg flex justify-center items-center gap-2"
        >
          {loading ? <Loader /> : "Sign In"}
        </button>
      </form>

      <div className="mt-6 pt-5 border-t border-gray-100">
        <p className="text-sm text-gray-600 text-center">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Create account
          </Link>
        </p>
      </div>

      {showForgotModal && (
        <PopUp
          title="Reset Password"
          icon={<Lock size={20} />}
          confirmText="Send Reset Link"
          confirmColor="blue"
          onConfirm={async () => {
            try {
              const res = await fetch(
                `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email: forgotEmail }),
                }
              );

              if (res.ok) {
                toast.success("Reset link sent to your email.");
                setShowForgotModal(false);
                setForgotEmail("");
              } else {
                toast.error("Failed to send reset link.");
              }
            } catch {
              toast.error("An error occurred.");
            }
          }}
          onCancel={() => {
            setShowForgotModal(false);
            setForgotEmail("");
          }}
        >
          <form className="flex flex-col gap-4">
            <input
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </form>
        </PopUp>
      )}
    </>
  );
}
