import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField } from "@mui/material";
import { toast } from "react-toastify";

interface ReportSectionProps {
  reportedId: number;
  onClose: () => void;
}

const ReportSection: React.FC<ReportSectionProps> = ({
  reportedId,
  onClose,
}) => {
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (description.trim() === "") {
      toast.error("Report is required");
      return;
    }

    try {
      // Replace with your actual backend URL and endpoint

      const reporterType = localStorage.getItem("userRole");
      const reporterId = localStorage.getItem("userId");
      const reportedType = "Tutor";
      const response = await axios.post(`http://localhost:5025/api/Reports`, {
        description,
        reportedId,
        reporterType,
        reporterId,
        reportedType,
      });
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
    <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
      <TextField
        id="outlined"
        label="Report here..."
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ mt: 3 }}
      />
      <Button
        color="primary"
        variant="contained"
        size="medium"
        sx={{ mt: 6 }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

export default ReportSection;
