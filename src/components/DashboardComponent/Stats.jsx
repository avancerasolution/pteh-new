"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Progress } from "antd";
import { motion } from "framer-motion";

/* 🔥 CHART.JS */
import { Pie as ChartPie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { fetchPillarStats, selectPillarStats, selectPillarStatsTotal } from "@/store/slices/pillarStatsSlice";

/* ===============================
   REGISTER CHART.JS
================================ */
ChartJS.register(ArcElement, Tooltip, Legend);

/* ===============================
   STATUS CONFIG
================================ */
const STATUS_CONFIG = [
  { label: "Not started", color: "#b12c4a" },
  { label: "Completed", color: "#6a9a3c" },
  { label: "In progress", color: "#86cfc9" },
  { label: "Blocked", color: "#f47c20" },
  { label: "Stalled", color: "#9a9a9a" },
];

export default function Stats() {
  const dispatch = useDispatch();
  const counts = useSelector(selectPillarStats);
  const total = useSelector(selectPillarStatsTotal);

  useEffect(() => {
    dispatch(fetchPillarStats());
  }, [dispatch]);

  /* ===============================
     PIE CHART DATA
  ================================ */
  const pieChartData = {
    labels: STATUS_CONFIG.map((s) => s.label),
    datasets: [
      {
        data: STATUS_CONFIG.map((s) => counts?.[s.label] || 0),
        backgroundColor: STATUS_CONFIG.map((s) => s.color),
        hoverBackgroundColor: STATUS_CONFIG.map((s) => s.color),
        borderWidth: 0,
      },
    ],
  };

  /* ===============================
     PIE CHART OPTIONS (FIXED)
  ================================ */
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#333",
          font: {
            size: 18, // 👈 LABEL SIZE (increase/decrease as needed)
            weight: "500",
          },
          padding: 20, // 👈 SPACE between legend items
          boxWidth: 16,
          boxHeight: 16,
          lineHeight: 28, // 👈 SPACE BELOW each label
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const percent = ((value / (total || 1)) * 100).toFixed(0);
            return `${context.label}: ${value} (${percent}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="container my-5 stats">
      <div className="row justify-content-center text-center">
        {/* ===============================
            TOP STATUS CIRCLES
        ================================ */}
        {STATUS_CONFIG.map((status, i) => (
          <div className="col-sm-2 mb-4" key={status.label}>
            <motion.div
              className="status-circle-wrap"
              style={{ backgroundColor: status.color }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: "easeOut",
              }}
            >
              <Progress
                type="circle"
                percent={100}
                strokeWidth={8}
                strokeColor="rgba(255,255,255,0.4)"
                format={() => (
                  <div className="status-inner-text">
                    <div className="status-label">Status:</div>
                    <div className="status-name">{status.label}</div>
                    <div className="status-count">{counts?.[status.label] || 0}</div>
                  </div>
                )}
              />
            </motion.div>
          </div>
        ))}

        {/* ===============================
            PIE CHART (100% RESPONSIVE)
        ================================ */}
        <motion.div
          className="col-12 mt-5"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="chart-wrapper">
            <ChartPie data={pieChartData} options={pieChartOptions} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
