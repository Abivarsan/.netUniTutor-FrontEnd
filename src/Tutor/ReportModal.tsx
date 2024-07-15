import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

const darkblue = {
  100: "#C9DCF7",
  200: "#789CFF",
  400: "#3A66FF",
  500: "#0044FF",
  600: "#0037CC",
  900: "#001B80",
};

interface ReportModalProps {
  reportedId: number;
  open: boolean;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ reportedId,open, onClose }) => {
  const [description,setDescription] = useState("");

  const handleSubmit = async () => {
    if (description.trim() === "") {
      toast.error("Report is required");
      return;
    }

    try {
      // Replace with your actual backend URL and endpoint
      const reporterType=localStorage.getItem("userRole");
      const reporterId=localStorage.getItem("userId");
      const reportedType="Student" ;
      const response = await axios.post(`http://localhost:5025/api/Reports`, { description,reportedId,reporterType,reporterId,reportedType});
      console.log(response);
      
      if (response.status === 201) {
        toast.success("Reported successfully");
        setDescription("");
        onClose();
      } else {
        toast.error("Failed to submit report");
      }
    } catch (error) {
      console.error("Error submitting report", error);
      toast.error("Error submitting report");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.5)" } }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 450,
          bgcolor: "background.paper",
          border: "none",
          boxShadow: 24,
          borderRadius: 4,
          p: 4,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h6"
          align="center"
          sx={{ color: darkblue[900], fontSize: "40px" }}
        >
          Report Student
        </Typography>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="auto"
          sx={{ mt: 3 }}
        >
          <TextField
            id="outlined"
            label="Report here..."
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{
              width: "100%",
              mt: 3,
              "& .MuiOutlinedInput-root": {
                fontSize: "20px",
                "& fieldset": {
                  borderColor: darkblue[500],
                },
                "&:hover fieldset": {
                  borderColor: darkblue[600],
                },
                "&.Mui-focused fieldset": {
                  borderColor: darkblue[900],
                },
              },
              "& .MuiInputLabel-root": {
                fontSize: "20px",
                color: darkblue[500],
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: darkblue[900],
              },
            }}
          />
          <Button
            variant="outlined"
            size="large"
            sx={{ mt: 5, color: "darkblue", borderColor: darkblue[500] }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReportModal;
