"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DoubleBarChart = ({
  title = "Double Bar Chart",
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
      type: "bar",
      height: 350,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 4,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: categories,
      title: {
        text: "Categories",
      },
    },
    yaxis: {
      title: {
        text: "Value",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val) => `₹${val.toLocaleString()}`,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
      labels: {
        colors: "#374151",
      },
    },
    colors: ["#2563EB", "#10B981"],
  };

  return (
    <div className="w-100 p-4 bg-white border rounded-3 shadow-sm mb-4">
      <h2 className="fs-5 fw-medium text-dark mb-3">{title}</h2>

      {/* Only render Chart after the component has mounted on the client */}
      {hasMounted && (
        <Chart
          options={options}
          series={seriesData}
          type="bar"
          width="100%"
          height={height}
        />
      )}
    </div>
  );
};

export default DoubleBarChart;