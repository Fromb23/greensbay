import { FaTachometerAlt, FaBox, FaShoppingCart, FaUsers, FaChartBar } from "react-icons/fa"; // Import icons
import CreateProduct from "./createProduct";

const AdminSidebar = ({ setActiveComponent }) => {
  const menuItems = [
    { name: "Dashboard", component: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "Products", component: "Products", icon: <FaBox /> },
    { name: "Orders", component: "Orders", icon: <FaShoppingCart /> },
    { name: "Customers", component: "Customers", icon: <FaUsers /> },
    { name: "Reports", component: "Reports", icon: <FaChartBar /> },
  ];

  return (
    <aside className="h-full w-full md:w-64 bg-gray-900 text-white p-4 flex flex-col">
      <h2 className="text-lg font-bold mb-4 md:block hidden">Admin Menu</h2>
      {menuItems.map((item) => (
        <button
          key={item.name}
          className="flex items-center w-full px-4 py-2 mb-2 hover:bg-gray-700 rounded-md"
          onClick={() => setActiveComponent(item.component)}
        >
          {/* Show icon always */}
          <span className="text-xl">{item.icon}</span>
          {/* Show text only on larger screens */}
          <span className="ml-2 md:inline hidden">{item.name}</span>
        </button>
      ))}
    </aside>
  );
};

export default AdminSidebar;