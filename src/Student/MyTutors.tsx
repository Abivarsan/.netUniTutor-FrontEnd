import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Tutorcardchat from "./Tutorcardchat";
import axios from "axios";
import { SubjectRequest } from "../data/interfaces";
import { toast } from "react-toastify";

export default function Mysubjects() {
  const [mySubjects, setmySubjects] = useState<SubjectRequest[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const fetchMySubjects = async () => {
    try {
      setIsFetching(true);
      const studentId = localStorage.getItem("userId");
      const response = await axios.get(`http://localhost:5025/api/Request/student/${studentId}/accepted`);
      setmySubjects(response.data);
      setIsFetching(false);
    } catch (error) {
      toast.error("Something went wrong");
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchMySubjects();
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
      {mySubjects.length === 0 ? (
        <Typography variant="h4" color="textSecondary" align="center">
          No subjects yet
        </Typography>
      ) : (
        <Grid container spacing={2} sx={{}}>
          {mySubjects.map((request) => (
            <Grid item sm={4} key={request._id}>
              <Tutorcardchat
                request={request}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
