const AdminSidebar = ({ setActiveComponent }) => {
	const menuItems = [
	  { name: "Dashboard", component: "Dashboard" },
	  { name: "Products", component: "Products" },
	  { name: "Orders", component: "Orders" },
	  { name: "Customers", component: "Customers" },
	  { name: "Reports", component: "Reports" },
	];
  
	return (
	  <aside className="h-full w-full md:w-64 bg-gray-900 text-white p-4 flex flex-col">
		<h2 className="text-lg font-bold mb-4">Admin Menu</h2>
		{menuItems.map((item) => (
		  <button
			key={item.name}
			className="block w-full text-left px-4 py-2 mb-2 hover:bg-gray-700 rounded-md"
			onClick={() => setActiveComponent(item.component)}
		  >
			{item.name}
		  </button>
		))}
	  </aside>
	);
  };
  
  export default AdminSidebar;  