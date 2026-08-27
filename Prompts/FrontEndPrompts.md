Act as an expert Frontend Developer specializing in Next.js, Bootstrap 5, and CSS Modules.

Analyze the attached Figma design screenshot and generate the exact React component and styling code according to these strict architecture guidelines:

### 1. Visual Analysis from Screenshot

- Inspect the screenshot for visual hierarchy, layout structure, text content, color palettes, spacing, badges, CTA buttons, and background elements.
- Replicate the exact design as closely as possible using standard Bootstrap 5 utilities combined with custom CSS Module styles.

### 2. Strict DOM Hierarchy Rules

Every component MUST strictly follow this nested structural flow:

1. Outer Section Wrapper: `<div className={`position-relative [Bootstrap Utilities] ${styles.[sectionName]}`}>`
2. Bootstrap Container: <div className="container"> (or container-fluid)
3. Content / Overlay Wrapper (if applicable): Position or flex alignment wrappers.
4. Bootstrap Row: <div className="row [Bootstrap Utility Classes]">
5. Bootstrap Column: <div className="col-12 col-md-... ${styles.[columnName]}">
6. Column Inner Content: Headings, paragraph text, CTAs, badges, and Next.js Images utilizing string interpolation.

### 3. Syntax & Framework Conventions

- Import Standards:
  import React from "react";
  import styles from "./[ComponentName].module.css";
  import Image from "next/image";
- Class Merging: Combine Bootstrap classes and CSS Module classes exclusively using template literals:
  className={`d-flex align-items-center ${styles.customClass}`}
- Images: Use Next.js <Image /> with appropriate props (`fill`, `priority`, `alt`, etc.).
- Component Structure: Standard ES6 arrow function with a default export.

---

### Component Request Details:

- Attached File: [Figma Screenshot Included]
- Component Name: [Insert Name, e.g., HeroSection]
- Additional Instructions: [Insert any dynamic props, hover states, or specific asset paths]