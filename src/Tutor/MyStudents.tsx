import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { TutorAccept } from "../data/interfaces";
import { toast } from "react-toastify";
import StudentCardChat from "./Studentcardchat";

export default function Mysubjects() {
  const [myStudents, setmyStudents] = useState<TutorAccept[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const fetchMyStudents = async () => {
    try {
      setIsFetching(true);
      const tutorId = localStorage.getItem("userId");
      const response = await axios.get(`http://localhost:5025/api/Request/tutor/${tutorId}/accepted`);
      setmyStudents(response.data);
      setIsFetching(false);
    } catch (error) {
      toast.error("Something went wrong");
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchMyStudents();
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
      {myStudents.length === 0 ? (
        <Typography variant="h4" color="textSecondary" align="center">
          No Students yet
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {myStudents.map((accept) => (
            <Grid item sm={4} key={accept._id}>
              <StudentCardChat
                accept={accept}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
