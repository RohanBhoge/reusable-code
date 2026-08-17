"use client";
import React, { useState, useRef, useCallback } from "react";
import "./Header.css";
import { Nav, Navbar } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import {
  LiaHomeSolid,
  LiaBuilding,
  LiaProjectDiagramSolid,
  LiaInfoSolid,
} from "react-icons/lia";
import { usePathname, useRouter } from "next/navigation";
import Logo from "../../../public/Images/logoalphera.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Refs for GSAP animation scoping and timeline control
  const containerRef = useRef(null);
  const tl = useRef(null);

  const handleNavigate = useCallback(() => {
    router.push("/contact");
  }, [router]);

  const normalizePath = (p = "") => {
    if (!p) return "";
    const withoutQuery = p.split("?")[0].split("#")[0];
    if (withoutQuery === "/") return "/";
    return withoutQuery.endsWith("/")
      ? withoutQuery.slice(0, -1)
      : withoutQuery;
  };

  const currentPath = pathname?.split("?")[0].split("#")[0] || "";
  const isActive = (path) => normalizePath(currentPath) === normalizePath(path);

  // ================= GSAP Animation Functions ===============================
  useGSAP(
    () => {
      // Desktop Mount Animation
      gsap.from(".logo, .nav-link-container, .contactBtn", {
        y: -76,
        duration: 0.7,
        opacity: 0,
        stagger: 0.3,
        ease: "power2.out",
      });

      // Mobile Menu Timeline
      tl.current = gsap
        .timeline({ paused: true })
        .to(".nav-overlay", {
          xPercent: -100, // Moves the menu into view from start-100
          x: 0,
          duration: 0.5,
          ease: "power3.inOut",
        })
        .to(
          ".hamburger-icon",
          { opacity: 0, scale: 0.5, duration: 0.2, ease: "power1.in" },
          "<",
        )
        .fromTo(
          ".close-icon",
          { opacity: 0, scale: 0, rotate: -90 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.2",
        )
        .fromTo(
          ".mobile-nav-item",
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" },
          "-=0.2",
        );
    },
    { scope: containerRef },
  );

  const toggleMenu = () => {
    if (!isOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    if (isOpen) {
      tl.current.reverse();
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="header">
      <Navbar
        expand="lg"
        className="px-lg-5 px-3 d-flex justify-content-between align-items-center"
      >
        <Link href="/" className="logo py-0 navbar-brand">
          <Image
            src={Logo}
            alt="Logo"
            width={100}
            height={40}
            priority
            className="img-fluid d-lg-block d-none"
          />
        </Link>

        {/* Desktop Navigation */}
        <Nav className="justify-content-between align-items-center flex-grow-1 pe-0 d-none d-lg-flex">
          <div className="nav-link-container d-flex align-items-center mx-auto">
            <Link
              className={`nav-link me-5 forhover p-0 ${isActive("/") ? "active-link" : ""}`}
              href="/"
            >
              Home
            </Link>
            <Link
              className={`nav-link me-5 forhover p-0 ${isActive("/services") ? "active-link" : ""}`}
              href="/services"
            >
              Services
            </Link>
            <Link
              className={`nav-link me-5 forhover p-0 ${isActive("/about") ? "active-link" : ""}`}
              href="/about"
            >
              About Us
            </Link>
            <Link
              className={`nav-link me-5 forhover p-0 ${isActive("/industries") ? "active-link" : ""}`}
              href="/industries"
            >
              Industries
            </Link>
          </div>

          <button
            style={{
              letterSpacing: "0.5px",
              background: "linear-gradient(to right, #FCB887, #C08457)",
              color: "#4E2601",
              border: "none",
              height: "45px",
              cursor: "pointer",
            }}
            className="contactBtn px-4 rounded-2 fw-bold fillHoverBtn"
            onClick={handleNavigate}
          >
            <span className="btnContent">Contact Us</span>
          </button>
        </Nav>

        {/* Mobile Toggle Button */}
        <button
          className="d-lg-none btn border-0 p-2 position-relative toggle-btn"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          style={{ zIndex: 1050 }}
        >
          <span
            className="hamburger-icon d-flex flex-column justify-content-between"
            style={{ height: "24px", width: "30px" }}
          >
            <span
              className="bar bg-dark d-block w-100"
              style={{ height: "3px", borderRadius: "2px" }}
            ></span>
            <span
              className="bar bg-dark d-block w-100"
              style={{ height: "3px", borderRadius: "2px" }}
            ></span>
            <span
              className="bar bg-dark d-block w-100"
              style={{ height: "3px", borderRadius: "2px" }}
            ></span>
          </span>
          <span
            className="close-icon position-absolute top-50 start-50 translate-middle text-white fs-1 fw-light"
            style={{ opacity: 0 }}
          >
            &times;
          </span>
        </button>
      </Navbar>
      <hr className="header-divider" />

      {/* Mobile Offcanvas Custom GSAP Overlay */}
      <div
        className="nav-overlay position-fixed top-0 start-100 vh-100 d-flex flex-column d-lg-none p-4"
        style={{
          backgroundColor: "#424243",
          zIndex: 1045,
          width: "70%", // Full width overlay
          maxWidth: "400px", // Limits width on larger tablets if needed
        }}
      >
        <Nav className="flex-column gap-3 mt-5 pt-4">
          <Link
            className={`mobile-nav-item nav-link text-white d-flex align-items-center gap-3 ${isActive("/") ? "active-link" : ""}`}
            href="/"
            onClick={handleLinkClick}
          >
            <LiaHomeSolid size={25} /> Home
          </Link>

          <Link
            className={`mobile-nav-item nav-link text-white d-flex align-items-center gap-3 ${isActive("/services") ? "active-link" : ""}`}
            href="/services"
            onClick={handleLinkClick}
          >
            <LiaProjectDiagramSolid size={25} /> Services
          </Link>

          <Link
            className={`mobile-nav-item nav-link text-white d-flex align-items-center gap-3 ${isActive("/about") ? "active-link" : ""}`}
            href="/about"
            onClick={handleLinkClick}
          >
            <LiaInfoSolid size={25} /> About Us
          </Link>

          <Link
            className={`mobile-nav-item nav-link text-white d-flex align-items-center gap-3 ${isActive("/industries") ? "active-link" : ""}`}
            href="/industries"
            onClick={handleLinkClick}
          >
            <LiaBuilding size={25} /> Industries
          </Link>

          <div className="mobile-nav-item mt-3">
            <button
              style={{
                letterSpacing: "0.5px",
                background: "linear-gradient(to right, #FCB887, #C08457)",
                color: "#4E2601",
                border: "none",
                width: "100%",
                height: "45px",
                cursor: "pointer",
              }}
              className="px-4 rounded-2 d-flex align-items-center justify-content-center gap-2 fillHoverBtn"
              onClick={() => {
                handleNavigate();
                handleLinkClick();
              }}
            >
              <span className="btnContent">Contact Us</span>
            </button>
          </div>
        </Nav>
      </div>
    </div>
  );
}
