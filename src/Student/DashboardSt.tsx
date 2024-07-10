import React, { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import BlockIcon from '@mui/icons-material/Block';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Tooltip,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import Variants from "../components/common/sketlan";

const darkblue = {
  100: "#C9DCF7",
  200: "#789CFF",
  400: "#3A66FF",
  500: "#0044FF",
  600: "#0037CC",
  900: "#001B80",
};

interface Student {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileUrl: string;
}

export default function DashboardSt() {
  const [mySubjectsCount, setMySubjectsCount] = useState<number>(0);
  const [acceptedRequestsCount, setAcceptedRequestsCount] = useState<number>(0);
  const [rejectedRequestsCount, setRejectedRequestsCount] = useState<number>(0);
  const [student, setStudent] = useState<Student | null>(null);


  const studentId = localStorage.getItem("userId"); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentResponse = await axios.get(`http://localhost:5025/api/Student/details/${studentId}`);
        setStudent(studentResponse.data);

        const mySubjectsResponse = await axios.get(`http://localhost:5025/api/SubjectRequests/${studentId}/mysubjects`);
        setMySubjectsCount(mySubjectsResponse.data);

        const acceptedRequestsResponse = await axios.get(`http://localhost:5025/api/SubjectRequests/${studentId}/acceptedrequests`);
        setAcceptedRequestsCount(acceptedRequestsResponse.data);

        const rejectedRequestsResponse = await axios.get(`http://localhost:5025/api/SubjectRequests/${studentId}/rejectedrequests`);
        setRejectedRequestsCount(rejectedRequestsResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [studentId]);

  if (!student) {
    return <Variants/>;
  }

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item sm={2}></Grid>
      <Grid item sm={3}>
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            width: 300,
            mt: 5,
            bgcolor: "#DEF1FE",
            height: 500,
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.01)",
            },
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              borderBottom: `3px solid ${darkblue[200]}`,
            }}
          >
            <CardHeader title={`Hi ${student.firstName} ${student.lastName}!!`} />
          </Box>

          <CardContent>
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                alt="profile-user"
                width="120px"
                height="120px"
                src={student.profileUrl}
                style={{ cursor: "pointer", borderRadius: "50%" }}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                mt: 2,
              }}
            ></Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="flex-start"
              flexDirection="column"
              sx={{ color: darkblue[900] }}
            >
              <Typography>
                <Tooltip title="Email">
                  <EmailIcon />
                </Tooltip>
                <h5>{student.email}</h5>
              </Typography>

              <Typography>
                <Tooltip title="Phone No">
                  <CallIcon />
                </Tooltip>
                <h5>{student.phoneNumber}</h5>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        sm={7}
        container
        sx={{ mt: 5, display: "flex", justifyContent: "space-around" }}
      >
        <Grid item>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              width: 200,
              bgcolor: "#DEF1FE",
              height: 150,
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.01)",
              },
            }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                borderBottom: `3px solid ${darkblue[200]}`,
              }}
            >
              <CardHeader title="My Subjects" />
            </Box>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <LocalLibraryIcon sx={{ color: "Darkblue", fontSize: 40 }} />
              <Typography sx={{ color: "Darkblue", fontSize: 30 }}>
                {mySubjectsCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              width: 200,
              bgcolor: "#DEF1FE",
              height: 150,
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.01)",
              },
            }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                borderBottom: `3px solid ${darkblue[200]}`,
              }}
            >
              <CardHeader title="Requests" />
            </Box>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <ArrowOutwardIcon sx={{ color: "green", fontSize: 40 }} />
              <Typography sx={{ color: "Darkblue", fontSize: 30 }}>
                {acceptedRequestsCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              width: 200,
              bgcolor: "#DEF1FE",
              height: 150,
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.01)",
              },
            }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                borderBottom: `3px solid ${darkblue[200]}`,
              }}
            >
              <CardHeader title="Rejected" />
            </Box>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <BlockIcon sx={{ color: "red", fontSize: 40 }} />
              <Typography sx={{ color: "Darkblue", fontSize: 30 }}>
                {rejectedRequestsCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
