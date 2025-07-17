// SignUpForm.jsx
import { useState } from "react";
import Input from "../../src/components/inputs/Input";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import ProfilePhotoSelect from "../../src/components/inputs/ProfilePhotoSelect";
import getPasswordStrength from "../../utils/Logout";
import Loader from "../../src/components/Loader";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
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

    if (!userName) {
      setError("Please enter your name");
      return;
    }

    if (!profilePic) {
      setError("Please select your profile image");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("userName", userName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("profilePic", profilePic); // Must be a File object

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "SignUp failed");

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("profileImage", data.user.profileImage);
        localStorage.setItem("Username", data.user.userName);
        localStorage.setItem(
          "tokenExpiry",
          (Date.now() + 60 * 60 * 1000).toString()
        );
        toast.success("SignUp successful");
        navigate("/");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (err) {
      toast.error(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="space-y-6">
      <ProfilePhotoSelect Image={profilePic} setImage={setProfilePic} />
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Create a new account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            value={userName}
            label="Username"
            onChange={({ target }) => setUserName(target.value)}
            placeholder="enter your name"
          />
          <Input
            type="email"
            value={email}
            label="Email Address"
            onChange={({ target }) => setEmail(target.value)}
            placeholder="you@example.com"
          />
        </div>

        <Input
          type="password"
          value={password}
          label="Password"
          onChange={({ target }) => setPassword(target.value)}
          placeholder="••••••••"
        />
        {password && (
          <div className="text-sm mt-2 font-medium text-gray-600">
            Strength:{" "}
            <span
              className={
                strength === "Weak"
                  ? "text-red-500"
                  : strength === "Medium"
                  ? "text-yellow-500"
                  : "text-green-600"
              }
            >
              {strength}
            </span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition shadow-md hover:shadow-lg flex justify-center items-center gap-2"
        >
          {loading ? <Loader /> : "Sign Up"}
        </button>
      </form>

      <div className="pt-5 border-t border-gray-100 text-sm text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-600">
          Login
        </Link>
      </div>
    </div>
  );
}
