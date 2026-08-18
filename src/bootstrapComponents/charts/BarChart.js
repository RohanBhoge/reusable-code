"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const BarChart = ({
  title = "Bar Chart",
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
      stacked: true,
      stackType: "100%",
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
        columnWidth: "50%",
        borderRadius: 4,
      },
    },
    xaxis: {
      categories: categories,
      title: {
        text: "Categories",
      },
    },
    yaxis: {
      title: {
        text: "Percentage (%)",
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#fff"],
      },
      formatter: (val) => `${val.toFixed(0)}%`,
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val) => `${val.toFixed(2)}%`,
      },
    },
    colors: ["#2563EB", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
    legend: {
      position: "top",
      horizontalAlign: "center",
      labels: {
        colors: "#374151",
      },
    },
    fill: {
      opacity: 1,
    },
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

export default BarChart;