import { Drawer } from "@mui/material";

export default function SideDrawer({
  open,
  closeDrawer,
  children,
}: {
  open: boolean;
  closeDrawer: () => void;
  children: React.ReactNode;
}) {
  return (
    <Drawer
      anchor="right"
      sx={{
        "& .MuiDrawer-paper": {
          width: "500px",
          px: 1,
        },
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
      onClose={closeDrawer}
    >
      {children}
    </Drawer>
  );
}
