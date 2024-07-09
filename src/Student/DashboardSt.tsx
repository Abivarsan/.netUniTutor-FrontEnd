import React from "react";
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
  Link,
  Tooltip,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import Stu from "./Images/Stu.jpg";

const darkblue = {
  100: "#C9DCF7",
  200: "#789CFF",
  400: "#3A66FF",
  500: "#0044FF",
  600: "#0037CC",
  900: "#001B80",
};

export default function DashboardSt() {
  const [value, setValue] = React.useState<number | null>(4);

  return (
    <Grid container sx={{  height: "100vh"}}>
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
              transform: "scale(1.05)",
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
            <CardHeader title=" Hi Nilaxsan!!" />
          </Box>

          <CardContent>
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                alt="profile-user"
                width="120px"
                height="120px"
                src={Stu}
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
            >
              
            </Box>
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
                <h5>nilaxsanala2001@gmail.com</h5>
              </Typography>

              <Typography>
                <Tooltip title="Phone No">
                  <CallIcon />
                </Tooltip>
                <h5>0763460985</h5>
              </Typography>

              <Typography>
                <Tooltip title="Current state">
                  <WorkIcon />
                </Tooltip>
                <h5>Student</h5>
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
                transform: "scale(1.05)",
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
              <CardHeader title="Tutors" />
            </Box>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              < LocalLibraryIcon sx={{ color: "Darkblue", fontSize: 40 }} />
              <Typography sx={{ color: "Darkblue", fontSize: 30 }}>
                {120}
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
                transform: "scale(1.05)",
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
                {6}
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
                transform: "scale(1.05)",
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
              <CardHeader title=" Rejected" />
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
                {12}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

     
      
    </Grid>
  );
}
