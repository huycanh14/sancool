import { Box, Toolbar } from "@mui/material";
import AdminDrawer from "./AdminDrawer";
import { useState } from "react";
import { useSettings } from "./contexts/SettingsProvider";
import AdminAppBar from "./AdminAppBar";
import AdminToolbar from "./AdminToolbar";

const AdminAuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { collapsed, open, toggleDrawer } = useSettings();
  const handleSettingsToggle = () => {
    setSettingsOpen(!settingsOpen);
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AdminDrawer
          collapsed={collapsed}
          mobileOpen={open}
          onDrawerToggle={toggleDrawer}
          onSettingsToggle={handleSettingsToggle}
        />
        <Box
          component="main"
          sx={{ flexGrow: 1, pb: 3, px: { xs: 3, sm: 6 } }}
          className="text-[#455A64]"
        >
          <Toolbar />
          <AdminAppBar>
            <AdminToolbar />
          </AdminAppBar>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default AdminAuthLayout;
