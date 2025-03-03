import React, { useState, useEffect } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { FaChartBar, FaMoneyBillWave, FaShoppingCart, FaUsers } from "react-icons/fa";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const ReportAnalysis = () => {
  // Simulated report data
  const [report, setReport] = useState({
    totalSales: 4500,
    totalRevenue: 120000,
    totalOrders: 850,
    totalCustomers: 300,
    monthlySales: [30, 50, 70, 90, 120, 150, 200, 220, 300, 320, 400, 450], // Example data
    categories: {
      Electronics: 40,
      Fashion: 30,
      Groceries: 20,
      Furniture: 10,
    },
  });

  useEffect(() => {
    // You can fetch actual reports from API here
    console.log("Fetching report data...");
  }, []);

  // Line Chart Data
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Monthly Sales",
        data: report.monthlySales,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.4,
      },
    ],
  };

  // Doughnut Chart Data
  const doughnutChartData = {
    labels: Object.keys(report.categories),
    datasets: [
      {
        label: "Category Sales",
        data: Object.values(report.categories),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaChartBar /> Report Analysis
      </h2>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded shadow flex items-center justify-between">
          <FaMoneyBillWave size={30} />
          <div>
            <h3 className="text-lg">Total Sales</h3>
            <p className="text-2xl font-bold">{report.totalSales}</p>
          </div>
        </div>
        <div className="bg-green-500 text-white p-4 rounded shadow flex items-center justify-between">
          <FaShoppingCart size={30} />
          <div>
            <h3 className="text-lg">Total Orders</h3>
            <p className="text-2xl font-bold">{report.totalOrders}</p>
          </div>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded shadow flex items-center justify-between">
          <FaUsers size={30} />
          <div>
            <h3 className="text-lg">Total Customers</h3>
            <p className="text-2xl font-bold">{report.totalCustomers}</p>
          </div>
        </div>
        <div className="bg-red-500 text-white p-4 rounded shadow flex items-center justify-between">
          <FaMoneyBillWave size={30} />
          <div>
            <h3 className="text-lg">Total Revenue</h3>
            <p className="text-2xl font-bold">${report.totalRevenue}</p>
          </div>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-2">Monthly Sales Trend</h3>
          <Line data={lineChartData} />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-2">Sales by Category</h3>
          <Doughnut data={doughnutChartData} />
        </div>
      </div>
    </div>
  );
};

export default ReportAnalysis;