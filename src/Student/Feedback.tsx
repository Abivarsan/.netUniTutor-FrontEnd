import {
    Avatar,
    Box,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Rating,
    Typography,
  } from "@mui/material";
  
  import { useEffect, useState } from "react";
  import moment from "moment";
  import { FeedbackI, ReviewResponse } from "../data/interfaces";
  
  const primaryText = (feedback: FeedbackI) => {
    return (
      <Box mb={1} display={"flex"} gap={2} alignItems={"center"}>
        <Typography variant="body2">
          {moment(feedback?.timestamp).format("DD MMM YYYY - hh:mm A")}
        </Typography>
        <Rating
          name="rating"
          size="small"
          precision={0.5}
          value={feedback?.rating  || 0}
          readOnly
        />
      </Box>
    );
  };
  export function Feedback({ feedback }: { feedback: FeedbackI }) {
    return (
      <ListItem key={feedback?._id} alignItems="flex-start">
        <ListItemText
          primary={primaryText(feedback)}
          secondary={feedback.feedback}
        />
      </ListItem>
    );
  }
  