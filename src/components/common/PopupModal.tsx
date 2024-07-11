import { Dialog, DialogContent, DialogTitle } from "@mui/material";

export default function PopupModal({
  open,
  minWidth = 500,
  maxWidth = "md",
  onClose,
  children,
}: {
  open: boolean;
  minWidth?: number;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      PaperProps={{
        sx: {
          minWidth: minWidth,
        },
      }}
    >
      <DialogContent sx={{ p: 1 }}>{children}</DialogContent>
    </Dialog>
  );
}
