"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./Header.module.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const tl = useRef(null);

  useGSAP(
    () => {
      gsap.set(`.${styles.navOverlay}`, { xPercent: 100 });

      tl.current = gsap
        .timeline({ paused: true })
        .to(`.${styles.navOverlay}`, {
          xPercent: 0,
          duration: 0.5,
          ease: "power3.inOut",
        })

        .to(
          `.${styles.hamburgerIcon}`,
          {
            opacity: 0,
            scale: 0.5,
            duration: 0.2,
            ease: "power1.in",
          },
          // "<",
        )
        .fromTo(
          `.${styles.closeIcon}`,
          { opacity: 0, scale: 0, rotate: -90 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          // "-=0.2",
        )
        .fromTo(
          `.${styles.navItem}`,
          { x: 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
          },
          // "-=0.2",
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
    <header ref={containerRef} className="position-relative">
      <nav className="navbar navbar-dark bg-dark px-4 py-3 d-flex justify-content-between align-items-center">
        <Link href="/" className="navbar-brand fw-bold fs-4 text-white">
          BRAND
        </Link>

        <button
          className={`btn border-0 p-2 position-relative ${styles.toggleBtn}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span
            className={`${styles.hamburgerIcon} d-flex flex-column justify-content-between`}
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </span>

          <span
            className={`${styles.closeIcon} position-absolute top-50 start-50 translate-middle text-white fs-2 fw-light`}
          >
            &times;
          </span>
        </button>
      </nav>

      {/* Positioned fixed on top-0 and end-0 (right edge) */}
      <div
        className={`${styles.navOverlay} position-fixed top-0 end-0 vh-100 text-white d-flex flex-column bg-secondary p-5`}
      >
        <ul className="nav flex-column text-start gap-4 p-0 m-0">
          <li className={styles.navItem}>
            <Link
              href="/"
              className="nav-link text-white fw-bold"
              onClick={handleLinkClick}
            >
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/services"
              className="nav-link text-white fw-bold"
              onClick={handleLinkClick}
            >
              Services
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/about"
              className="nav-link text-white fw-bold"
              onClick={handleLinkClick}
            >
              About Us
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/projects"
              className="nav-link text-white fw-bold"
              onClick={handleLinkClick}
            >
              Projects
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/contact"
              className="nav-link text-white fw-bold"
              onClick={handleLinkClick}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
