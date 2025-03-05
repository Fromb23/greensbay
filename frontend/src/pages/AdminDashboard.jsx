import { useState, useEffect } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import ContentArea from "../components/ContentArea";
import AdminFooter from "../components/AdminFooter";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState(
    sessionStorage.getItem("activeComponent") || "Dashboard",
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    sessionStorage.setItem("activeComponent", activeComponent);
  }, [activeComponent]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <AdminHeader />

      <div className="flex flex-1">
        {/* Sidebar should always be present */}
        <div className="w-16 md:w-64 bg-gray-900">
          <AdminSidebar setActiveComponent={setActiveComponent} />
        </div>

        {/* Content Area should always be visible */}
        <div className="flex-1">
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