import { drawerCollapsedWidth, drawerWidth } from "@/common/layout";
import {
  Box,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Drawer,
  ListItem,
  ListItemButton,
  styled,
} from "@mui/material";
// import { useAuth } from "../../auth/contexts/AuthProvider";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import { usePathname, useRouter } from "next/navigation";

type AdminDrawerProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  onDrawerToggle: () => void;
  onSettingsToggle: () => void;
};

export const menuItems = [
  {
    icon: HomeIcon,
    key: "dashboard",
    name: "Dashboard",
    path: "/admin",
  },
  {
    icon: BarChartIcon,
    key: "user-spin",
    name: "Người quay",
    path: "/admin/user-spin",
  },
];

const AdminDrawer = ({
  collapsed,
  mobileOpen,
  onDrawerToggle,
  onSettingsToggle,
}: AdminDrawerProps) => {
  const width = collapsed ? drawerCollapsedWidth : drawerWidth;
  const pathname = usePathname();

  const drawer = (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      {/* <Logo sx={{ display: "flex", p: 4 }} /> */}
      <List component="nav" sx={{ px: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            disablePadding
            key={item.path}
            className={`${pathname === item.path ? "Mui-selected" : ""}`}
            sx={{
              ":hover": {
                backgroundColor: "rgba(41, 98, 255, 0.04);",
              },
            }}
          >
            <Link href={item.path} passHref legacyBehavior>
              <ListItemButton
                component="a"
                sx={{
                  ":hover": {
                    backgroundColor: "unset",
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ color: "inherit", bgcolor: "transparent" }}>
                    <item.icon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  sx={{
                    display: collapsed ? "none" : "block",
                  }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <List component="nav" sx={{ p: 2 }}>
        <Link
          // button
          // component={NavLink}
          href={`/${process.env.NEXT_PUBLIC_URL}/admin/profile`}
        >
          <ListItemAvatar>
            <Avatar>{/* <PersonIcon /> */}</Avatar>
          </ListItemAvatar>
          {/* {userInfo && (
            <ListItemText
              primary={`${userInfo.firstName} ${userInfo.lastName}`}
              sx={{
                display: collapsed ? "none" : "block",
              }}
            />
          )} */}
        </Link>
        <ListItem button onClick={onSettingsToggle}>
          <ListItemAvatar>
            <Avatar>{/* <SettingsIcon /> */}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={"settings"}
            sx={{
              display: collapsed ? "none" : "block",
            }}
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      aria-label="Admin drawer"
      component="nav"
      sx={{
        width: { lg: width },
        flexShrink: { lg: 0 },
      }}
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: width,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: width,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default AdminDrawer;
