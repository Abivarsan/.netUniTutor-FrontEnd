import { Dialog, DialogContent, DialogTitle } from "@mui/material";

export default function PopupModal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ p: 1 }}>{children}</DialogContent>
    </Dialog>
  );
}
