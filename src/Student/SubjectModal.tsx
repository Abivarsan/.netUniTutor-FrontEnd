import { Box, Divider, Rating, Typography } from "@mui/material";
import { ReviewResponse, SubjectResponse } from "../data/interfaces";
import { useEffect, useState } from "react";
import axios from "axios";
import { Feedback } from "./Feedback";

export default function SubjectModal({
  selectedSubject,
}: {
  selectedSubject: SubjectResponse;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState<ReviewResponse | null>(null);

  const fetchFeedback = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8082/review/subject/${selectedSubject._id}`
      );
      setFeedbacks(response.data);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <Box p={2} width={"100%"}>
      <Typography variant="h4" py={1}>
        {selectedSubject?.title}
      </Typography>
      <Rating
        value={parseFloat(selectedSubject?.averageRating.toFixed(1))}
        precision={0.5}
        readOnly
        sx={{
          fontSize: 25,
        }}
      />
      <img
        src={selectedSubject?.coverImage}
        alt="subject"
        width="100%"
        height={200}
        style={{
          objectFit: "cover",
          objectPosition: "center",
          margin: "10px 0",
        }}
      />
      <Divider />
      <Typography variant="body1" color="text.secondary">
        {selectedSubject?.description}
      </Typography>
      <Box my={2}>
        <Typography variant="body1">
          Tutor: {selectedSubject?.tutorName}
        </Typography>
        <Typography variant="body1">Mode: {selectedSubject?.mode}</Typography>
        <Typography variant="body1">
          Availability: {selectedSubject?.availability.join(" | ")}
        </Typography>
        <Typography variant="body1">
          Medium: {selectedSubject?.medium.join(" | ")}
        </Typography>
      </Box>
      <Divider />
      <Box my={2}>
        {isLoading ? (
          <Typography
            variant="body1"
            color={"text.secondary"}
            textAlign={"center"}
          >
            Loading...
          </Typography>
        ) : feedbacks?.reviews.length === 0 ? (
          <Typography
            variant="body1"
            color={"text.secondary"}
            textAlign={"center"}
          >
            No feedbacks yet
          </Typography>
        ) : (
          feedbacks?.reviews.map((feedback) => (
            <Box key={feedback._id} my={2}>
              <Feedback feedback={feedback} />
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}
