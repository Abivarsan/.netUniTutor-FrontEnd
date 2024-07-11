import React, { useState } from "react";
import { Box, Button, Rating, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import axios from 'axios';

interface ReviewSectionProps {
  initialRating: 0;
  subjectid: number;
  studentid: number;
  onClose: () => void;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ initialRating, onClose, subjectid, studentid }) => {
  const [value, setValue] = useState<number | null>(initialRating);
  const [feedback, setFeedback] = useState("");

  const handleReviewSubmit = async () => {
    try {
      if (feedback.trim() === "") {
        toast.error("Comment is required");
        return;
      }

      const response = await axios.post(`http://localhost:5025/api/Review/create/${subjectid}/${studentid}`, {
        rating: value,
        feedback: feedback,
      });

      console.log('Review submitted successfully');
      onClose();
      toast.success("Submitted successfully");
      setFeedback("");
      setValue(initialRating);
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error("Failed to submit review");
    }
  };

  return (
    <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ fontSize: "50px", mb: 3 }}
      />

      <TextField
        id="outlined"
        label="Add Comment here..."
        multiline
        rows={3}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ mb: 3 }}
      />

      <Button variant="contained" size="medium" onClick={handleReviewSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default ReviewSection;
