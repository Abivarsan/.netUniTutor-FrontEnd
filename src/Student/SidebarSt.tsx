import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import LogoutIcon from "@mui/icons-material/Logout";
import data from "../dataStu";
import { useNavigate, useLocation, To } from "react-router-dom";
import { Dashboard } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import logoUnitutor from "../logoUnitutor.png";

const drawerWidth = 210;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const profile = ["My Profile", "Logout"];
const initialNotifications = [
  "Notification 1",
  "Notification 2",
  "Notification 3",
];

export default function Sidebarst() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [logoutConfirmationOpen, setLogoutConfirmationOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [notifications, setNotifications] =
    React.useState(initialNotifications);
  const notificationCount = notifications.length;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElNotifications, setAnchorElNotifications] =
    React.useState<null | HTMLElement>(null);

  const handleLogoutConfirmationOpen = () => {
    setLogoutConfirmationOpen(true);
  };

  const handleLogoutConfirmationClose = () => {
    setLogoutConfirmationOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    navigate("/signin"); // Redirect to login or home page after logout
  };
  const tabClickEvent = (route: { label: string; path: To }, index: number) => {
    if (route.label === "Logout") {
      handleLogoutConfirmationOpen();
    } else {
      navigate(route.path);
    }
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenNotificationsMenu = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseNotificationsMenu = () => {
    setAnchorElNotifications(null);
  };

  const handleNotificationClick = (notification: string) => {
    navigate("/chat");
    setNotifications(notifications.filter((item) => item !== notification));
    handleCloseNotificationsMenu();
  };

  return (
    <Box sx={{ display: "flex", color: "lightblue" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          color: "darkblue",
          top: 0,
        }}
      >
        <Toolbar
          sx={{
            bgcolor: "#7DB4D8",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box height={50} width={50}>
            <img
              src={logoUnitutor}
              alt="logo"
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                borderRadius: 10,
                marginTop: 3,
              }}
            />
          </Box>

          <Typography variant="h6" noWrap component="div" sx={{ ml: 2 }}>
            Student Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Side bar */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            bgcolor: "#7DB4D8",
          }}
        >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon
                sx={{
                  color: "darkblue",
                }}
              />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ bgcolor: "lightblue", height: "calc(100vh - 60px)" }}>
          {data.map((route: any, index: number) => (
            <ListItem
              key={route.id}
              disablePadding
              sx={{ display: "block" }}
              style={{
                background:
                  route.path == location.pathname ? "#7DB4D8" : "lightblue",
              }}
            >
              <ListItemButton
                sx={{
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => tabClickEvent(route, index)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "Darkblue",
                  }}
                >
                  {route.icon}
                </ListItemIcon>
                <ListItemText
                  primary={route.label}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Dialog
        open={logoutConfirmationOpen}
        onClose={handleLogoutConfirmationClose}
      >
        <DialogTitle>Logout Confirmation</DialogTitle>
        <DialogContent>
          <Box display="flex" alignItems="center">
            <LogoutIcon
              color="error"
              sx={{
                size: "large ",
              }}
            />
            <Typography variant="body1" sx={{ marginLeft: 1 }}>
              Are you sure you want to logout?
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleLogoutConfirmationClose}
            color="primary"
            variant="outlined"
            size="small"
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            color="error"
            variant="contained"
            size="small"
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
