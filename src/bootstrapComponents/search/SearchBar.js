"use client";

import React, { useState } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({
  placeholder = "Search by Name, ID, or Email...",
  onSearch,
  value = "",
  className = "",
}) => {
  const [searchValue, setSearchValue] = useState(value);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    if (onSearch) {
      onSearch(newValue);
    }
  };

  return (
    <div className={`${styles.searchContainer} ${className}`}>
      <div className={styles.searchWrapper}>
        <span className={styles.searchIcon}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          className={styles.searchInput}
          placeholder={placeholder}
          value={searchValue}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
