import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Tutorcardchat from "./Tutorcardchat";
import axios from "axios";
import { SubjectRequest } from "../data/interfaces";
import { toast } from "react-toastify";

export default function Mysubjects() {
  const [requestedSubjects, setRequestedSubjects] = useState<SubjectRequest[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const fetchRequestedSubjects = async () => {
    try {
      setIsFetching(true);
      const studentId = localStorage.getItem("userObjId");
      const response = await axios.get(`http://localhost:8082/subject-request/student/${studentId}`);
      setRequestedSubjects(response.data);
      setIsFetching(false);
    } catch (error) {
      toast.error("Something went wrong");
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchRequestedSubjects();
  }, []);

  if (isFetching)
    return (
      <Box>
        <Typography variant="h6" color="textSecondary" align="center">
          Loading...
        </Typography>
      </Box>
    );

  return (
    <Box sx={{ p: 2 }}>
      {requestedSubjects.length === 0 ? (
        <Typography variant="h4" color="textSecondary" align="center">
          No subjects yet
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {requestedSubjects.map((request) => (
            <Grid item sm={4} key={request._id}>
              <Tutorcardchat
                tutorName={request.tutorName}
                tutorDescription={request.description}
                initialRating={request.rating}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
