import React from "react";
import Products from "./Products";
import ReportAnalysis from "./ReportAnalysis";
import CustomerInfo from "./CustomerInfo";

const ContentArea = ({ activeComponent, setActiveComponent }) => {
  if (!activeComponent) return null;

  return (
    <div className="p-4 flex flex-col h-full w-full bg-gray-100">
      {activeComponent !== "Dashboard" && (
        <button
          onClick={() => setActiveComponent("Dashboard")}
          className="md:hidden bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          ← Back to Dashboard
        </button>
      )}

      {/* Display the Active Component */}
      {activeComponent === "Dashboard" && <ReportAnalysis />}
      {activeComponent === "Products" && <Products />}
      {activeComponent === "Orders" && <h1>Orders List</h1>}
      {activeComponent === "Customers" && <CustomerInfo />}
      {activeComponent === "Reports" && <h1>Reports Data</h1>}
    </div>
  );
};

export default ContentArea;