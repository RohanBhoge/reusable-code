"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LineChart = ({
  title = "Line Chart",
  categories = [],
  seriesData = [],
  height = 350,
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const options = {
    chart: {
      id: "basic-line-chart",
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    xaxis: {
      categories: categories,
      title: {
        text: "Months",
      },
    },
    yaxis: {
      title: {
        text: "Value",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 5,
      hover: {
        size: 7,
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val) => `₹${val.toLocaleString()}`,
      },
    },
    colors: ["#2563EB"],
    fill: {
      type: "solid",
    },
  };

  const series = [
    {
      name: "Sales / Revenue",
      data: seriesData,
    },
  ];

  return (
    <div className="w-100 p-4 bg-white border rounded-3 shadow-sm mb-4">
      <h2 className="fs-5 fw-medium text-dark mb-3">{title}</h2>

      {/* Only render Chart after the component has mounted on the client */}
      {hasMounted && (
        <Chart
          options={options}
          series={series}
          type="line"
          width="100%"
          height={height}
        />
      )}
    </div>
  );
};

export default LineChart;