import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";

interface ReportSectionProps {
  onClose: () => void;
}

const ReportSection: React.FC<ReportSectionProps> = ({ onClose }) => {
  const [report, setReport] = useState("");

  const handleSubmit = () => {
    if (report.trim() === "") {
      toast.error("Report is required");
      return;
    }

    console.log("Submitted:", { report });

    toast.success("Reported successfully");
    setReport("");
    onClose();
  };

  return (
    <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
      <TextField
        id="outlined"
        label="Report here..."
        multiline
        rows={3}
        value={report}
        onChange={(e) => setReport(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ mt: 3 }}
      />

      <Button color="primary" variant="contained" size="medium" sx={{ mt: 6 }} onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default ReportSection;
