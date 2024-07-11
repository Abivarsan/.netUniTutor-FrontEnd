import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

type ImageViewerDialogProps = {
  open: boolean;
  imageUrl: string;
  onClose: () => void;
};

const ImageViewerDialog: React.FC<ImageViewerDialogProps> = ({ open, imageUrl, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>View Image</DialogTitle>
      <DialogContent>
        <img src={imageUrl} alt="Document" style={{ width: "100%" }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageViewerDialog;
