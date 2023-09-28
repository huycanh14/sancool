"use client";
import AuthProvider from "@/common/contexts/AuthProvider";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SettingsProvider from "./layouts/contexts/SettingsProvider";
import AdminAuthLayout from "./layouts/AdminLayout";
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <>
      <AuthProvider>
        {pathname === "/admin/login" ? (
          <>{children}</>
        ) : (
          <>
            <SettingsProvider>
              <AdminAuthLayout>{children}</AdminAuthLayout>
            </SettingsProvider>
          </>
        )}
      </AuthProvider>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default AdminLayout;
