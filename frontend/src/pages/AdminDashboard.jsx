import { useState, useEffect } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import ContentArea from "../components/ContentArea";
import AdminFooter from "../components/AdminFooter";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard"); // Default to Dashboard
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <AdminHeader />

      <div className="flex flex-1">
        {/* Sidebar for Desktop */}
        <div className="hidden md:block w-64">
          <AdminSidebar setActiveComponent={setActiveComponent} />
        </div>

        {/* Mobile: Show Sidebar or Content Area */}
        <div className="md:hidden flex-1">
          {activeComponent === "Dashboard" ? (
            <AdminSidebar setActiveComponent={setActiveComponent} />
          ) : (
            <ContentArea
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
            />
          )}
        </div>

        {/* Content Area for Desktop */}
        <div className="hidden md:flex flex-1">
          <ContentArea
            activeComponent={activeComponent}
            setActiveComponent={setActiveComponent}
          />
        </div>
      </div>

      <AdminFooter />
    </div>
  );
};

export default AdminDashboard;