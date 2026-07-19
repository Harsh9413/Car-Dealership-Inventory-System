import { useState } from "react";
import './login.css';
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiTruck,
} from "react-icons/fi";

import { login } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";
import { loginSchema } from "../utils/loginSchema";
import type { LoginFormData } from "../utils/loginSchema";

function Login() {
  const navigate = useNavigate();
  const { login: loginUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);

      const response = await login(data);

      loginUser(response.data.token, response.data.user);

      toast.success(response.message);

      navigate("/dashboard");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="login-page">
    <div className="login-wrapper">
      {/* Left Section */}
      <div className="login-left">
        <div className="brand">
          <div className="brand-logo">🚗</div>

          <div>
            <h2>VIS Dealership</h2>
            <p>Vehicle Inventory System</p>
          </div>
        </div>

        <div className="hero">
          <h1>
            Vehicle
            <br />
            Inventory
            <br />
            System
          </h1>

          <p>
            Manage your dealership inventory with a secure,
            fast and modern platform designed for effortless
            inventory management.
          </p>

          <div className="features">
            <div className="feature">
              <div className="feature-icon">
                <FiCheckCircle />
              </div>

              <span>Manage Vehicle Inventory</span>
            </div>

            <div className="feature">
              <div className="feature-icon">
                <FiTruck />
              </div>

              <span>Purchase & Restock Vehicles</span>
            </div>
          </div>
        </div>

        <div className="copyright">
          © 2026 Vehicle Inventory System
        </div>
      </div>

      {/* Right Section */}
      <div className="login-right">
        <div className="login-card">
          <div className="login-logo">🚗</div>

          <div className="login-header">
            <h2>Welcome Back</h2>

            <p>Login to continue to your dashboard</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="login-form"
          >
            <div className="input-group">
              <label>Email Address</label>

              <div className="input-box">
                <FiMail />

                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                />
              </div>

              {errors.email && (
                <p className="error-text">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="input-group">
              <label>Password</label>

              <div className="input-box">
                <FiLock />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                />

                <button
                  type="button"
                  className="password-btn"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <FiEyeOff />
                  ) : (
                    <FiEye />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="error-text">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="login-btn"
            >
              {loading ? "Signing In..." : "Login"}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/register">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default Login;