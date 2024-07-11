import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import TutorCard from "./TutorCard";
import axios from "axios";
import { RequestResponse, SubjectRequest } from "../data/interfaces";
import { toast } from "react-toastify";

interface CardState {
  id: number;
  visible: boolean;
}

export default function Requested() {
  const [requestedSubjects, setRequestedSubjects] = useState<SubjectRequest[]>(
    []
  );
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const fetchRequestedSubjects = async () => {
    try {
      setIsFetching(true);
      const studentId = localStorage.getItem("userObjId");
      const response = await axios.get(
        `http://localhost:8082/subject-request/student/${studentId}`
      );
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
          No subject requests yet
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {requestedSubjects.map((request) => (
            <Grid item sm={4} key={request._id}>
              <TutorCard request={request} onCancel={() => {}} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
