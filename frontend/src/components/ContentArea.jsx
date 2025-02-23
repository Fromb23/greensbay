import React from "react";
import Products from "./Products";

const ContentArea = ({ activeComponent, setActiveComponent }) => {
	return (
	  <div className="p-4 flex flex-col h-full w-full bg-gray-100">
		{/* Back Button for Mobile */}
		<button
		  onClick={() => setActiveComponent(null)}
		  className="md:hidden bg-blue-500 text-white px-4 py-2 rounded mb-4"
		>
		  ← Back to Menu
		</button>
  
		{/* Display the Active Component */}
		{activeComponent === "Dashboard" && <h1>Dashboard Content</h1>}
		{activeComponent === "Products" && <Products />}
		{activeComponent === "Orders" && <h1>Orders List</h1>}
		{activeComponent === "Customers" && <h1>Customers Info</h1>}
		{activeComponent === "Reports" && <h1>Reports Data</h1>}
	  </div>
	);
  };
  
  export default ContentArea;  