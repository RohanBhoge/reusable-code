"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
import TextInput from "@/components/forms/TextInput";
import Button from "@/components/buttons/Button";
import styles from "./LoginForm.module.css";
// import { apiRequest } from "../../../lib/apiRequest";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const capitalizeMessage = (message = "") =>
    message.replace(/\b\w/g, (char) => char.toUpperCase());

  useEffect(() => {
    const expiry = localStorage.getItem("tokenExpiry");
    if (expiry && Date.now() > parseInt(expiry, 10)) {
      localStorage.clear();
      toast.info("Session Expired. Please Login Again.", {
        position: "top-right",
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShowPassword(false);

    if (!username.trim() || !password.trim()) {
      setError("Please enter both Staff ID and Password.");
      return;
    }

    setLoading(true);

    try {
      // const { ok, data } = await apiRequest(
      //   "/admin/login",
      //   "POST",
      //   { username, password },
      //   false,
      // );

      if (ok) {
        const expiryTime = Date.now() + 24 * 60 * 60 * 1000;

        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminName", JSON.stringify(data.admin.fullName));
        localStorage.setItem("adminId", data.admin.admin_id);
        localStorage.setItem("adminUserName", data.admin.username);
        localStorage.setItem("tokenExpiry", expiryTime.toString());
        localStorage.setItem("adminData", JSON.stringify(data.admin));

        toast.success("Login Successful!", {
          position: "top-right",
        });

        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        const errorMsg = capitalizeMessage(
          data.message || "Invalid Username Or Password",
        );
        setError(errorMsg);
        toast.error(errorMsg, {
          position: "top-right",
        });
      }
    } catch (err) {
      const genericMsg = "Something Went Wrong. Please Try Again.";
      setError(genericMsg);
      toast.error(genericMsg, {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid p-0 min-vh-100 overflow-hidden bg-white">
      <div className="row g-0 min-vh-100">
        {/* LEFT COLUMN: Hero Image */}
        <div
          className={`col-lg-5 d-none d-lg-flex flex-column justify-content-between position-relative p-4 p-xl-5 overflow-hidden ${styles.heroContainer}`}
        >
          {/* Background Image */}
          <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
            <Image
              src="/login.png"
              alt="University Campus"
              fill
              priority
              className={styles.heroImage}
            />
          </div>

          {/* Custom Linear Gradient Overlay */}
          <div
            className={`position-absolute top-0 start-0 w-100 h-100 z-1 ${styles.gradientOverlay}`}
          />

          {/* Top Spacer */}
          <div className="position-relative z-2" />

          {/* Bottom Hero Text Block */}
          <div
            className={`position-relative z-2 text-white ${styles.fadeInUp}`}
          >
            <span
              className={`badge rounded-pill px-3 py-2 text-uppercase fw-bold text-light ${styles.heroTextBadge}`}
            >
              Empowering Education
            </span>

            <h1
              className={`display-5 fw-bolder mt-4 mb-0 text-white ${styles.heroTitle}`}
            >
              Shaping the Future of Learning.
            </h1>

            <div className={`my-4 rounded-pill ${styles.brandDivider}`} />

            <p
              className={`small text-uppercase text-light mb-0 ${styles.copyright}`}
            >
              © 2026 EDUVANTA. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Login Form */}
        <div className="col-12 col-lg-7 d-flex flex-column align-items-center justify-content-center p-4 p-md-5 bg-white overflow-auto">
          <div
            className={`mx-auto d-flex flex-column justify-content-center ${styles.formContainer} ${styles.fadeInUpFast}`}
          >
            {/* Logo Header */}
            <div className="mb-5">
              <Image
                src="/logo.svg"
                alt="Eduvanta Logo"
                width={300}
                height={90}
                priority
                style={{
                  height: "5rem",
                  width: "auto",
                  objectFit: "contain",
                  maxWidth: "260px",
                }}
              />
            </div>

            {/* Heading */}
            <div className="mb-4">
              <h2 className="fs-3 fw-bold text-dark">Welcome to Eduvanta</h2>
              <p className="text-secondary small mt-1">
                Please enter your university credentials to access the portal.
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div
                className="alert alert-danger d-flex align-items-center gap-2 mb-4 py-2 border-danger bg-danger bg-opacity-10 text-danger"
                role="alert"
              >
                <AlertCircle className="flex-shrink-0" size={20} />
                <span className="small">{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              {/* Staff/Faculty ID Input */}
              <TextInput
                label="STAFF/FACULTY ID"
                placeholder="e.g. j.smith_2024"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              {/* Password Input with Eye Toggle */}
              <TextInput
                label="PASSWORD"
                labelRight={
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(
                        "Please contact your IT administrator to reset your password.",
                      );
                    }}
                    className={`small fw-medium text-decoration-none text-secondary ${styles.forgotLink}`}
                  >
                    Forgot Password?
                  </a>
                }
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                rightIcon={
                  showPassword ? (
                    <EyeOff
                      className="text-secondary"
                      style={{ cursor: "pointer" }}
                      size={20}
                    />
                  ) : (
                    <Eye
                      className="text-secondary"
                      style={{ cursor: "pointer" }}
                      size={20}
                    />
                  )
                }
                onRightIconClick={() => setShowPassword(!showPassword)}
              />

              {/* Remember Me Checkbox */}
              <div className="form-check d-flex align-items-center gap-2 my-2">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="form-check-input mt-0"
                  style={{ cursor: "pointer" }}
                />
                <label
                  htmlFor="remember"
                  className="form-check-label small text-secondary"
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  Remember this device
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={loading}
                className={`w-100 py-3 fs-6 fw-semibold shadow-sm ${styles.submitBtn}`}
              >
                Log In to Portal
              </Button>
            </form>

            {/* Quick Helper Note */}
            <div className="mt-5 pt-4 border-top text-center">
              <p className="small text-secondary mb-0">
                Need help logging in? Contact system administration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
