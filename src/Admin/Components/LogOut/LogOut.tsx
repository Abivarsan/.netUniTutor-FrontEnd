import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Logout } from "@mui/icons-material";

type AlertBoxProps = {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onAgree: () => void;
};

const AlertBox: React.FC<AlertBoxProps> = ({ open, title, message, onClose, onAgree }) => {
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
};

const LogoutComponent: React.FC = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleLogoutConfirm = () => {
    setAlertOpen(false);
    // Perform the logout logic here (e.g., clear auth tokens, update state)
    navigate("/"); // Redirect to the homepage or login page
  };

  return (
    <div>
      <Button onClick={handleLogoutClick} startIcon={<Logout />}>
        Log Out
      </Button>
      <AlertBox
        open={alertOpen}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        onClose={handleAlertClose}
        onAgree={handleLogoutConfirm}
      />
    </div>
  );
};

export default LogoutComponent;
