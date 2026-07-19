import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { register as registerUser } from "../api/auth.api";
import { registerSchema } from "../utils/registerSchema";
import type { RegisterFormData } from "../utils/registerSchema";

import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);

      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success("Registration successful");

      navigate("/login");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">

        <h1 className="register-title">Create Account</h1>

        <p className="register-subtitle">
          Join us and start managing your vehicles.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="register-form"
        >
          {/* Name */}
          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              {...register("name")}
              placeholder="Enter your name"
            />

            {errors.name && (
              <p className="error-text">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
            />

            {errors.email && (
              <p className="error-text">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
            />

            {errors.password && (
              <p className="error-text">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label>Confirm Password</label>

            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm your password"
            />

            {errors.confirmPassword && (
              <p className="error-text">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="register-btn"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="register-footer">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;