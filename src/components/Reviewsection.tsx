import React, { useState } from "react";
import { Box, Button, Rating, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";

interface ReviewSectionProps {
  initialRating: number;
  onClose: () => void;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ initialRating, onClose }) => {
  const [value, setValue] = useState<number | null>(initialRating);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (comment.trim() === "") {
      toast.error("Comment is required");
      return;
    }

    console.log("Submitted:", { comment, rating: value });

    toast.success("Submitted successfully");
    setComment("");
    setValue(initialRating);
    onClose();
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
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ mb: 3 }}
      />

      <Button variant="contained" size="medium" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default ReviewSection;
