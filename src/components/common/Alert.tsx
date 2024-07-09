import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function AlertBox({
  open,
  title,
  message,
  onClose,
  onAgree,
}: {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onAgree: () => void;
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button onClick={onAgree} autoFocus>
          Yes, Sure
        </Button>
      </DialogActions>
    </Dialog>
  );
}
