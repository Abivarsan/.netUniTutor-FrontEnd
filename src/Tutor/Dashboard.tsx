import React from "react";
import Typography from "@mui/material/Typography";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Rating,
  Tooltip,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import CallReceivedSharpIcon from '@mui/icons-material/CallReceivedSharp';
import MenuBookIcon from "@mui/icons-material/MenuBook";
import prof from "./Images/prof.png";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const darkblue = {
  100: "#C9DCF7",
  200: "#789CFF",
  400: "#3A66FF",
  500: "#0044FF",
  600: "#0037CC",
  900: "#001B80",
};

export default function Dashboard() {
  const [userDetails, setUserDetails] = React.useState<any>(null); // State to hold user details
  const [isLoading, setIsLoading] = React.useState(true);
  const [stats, setStats] = React.useState<any>(null);

  React.useEffect(() => {
    // Function to fetch user details
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId"); // Get userId from localStorage

      // Example endpoint to fetch user details by userId
      const endpoint = `http://localhost:5025/api/Tutor/details/${userId}`;

      try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass JWT token for authentication
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUserDetails(userData);
          setStats(userData.stats); // Assuming stats are part of userData
        } else {
          console.error("Failed to fetch user details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails(); // Call the function to fetch user details
  }, []); // Empty dependency array ensures it runs once on component mount

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item sm={2}></Grid>
      <Grid item sm={3}>
        {userDetails && (
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
              <CardHeader title={`Hi ${userDetails.firstName}!!`} />
            </Box>

            <CardContent>
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="120px"
                  height="120px"
                  src={userDetails.ProfileUrl}
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
                {/* <Rating
                  name="read-only"
                  value={userDetails.rating}
                  readOnly
                  sx={{
                    fontSize: 18,
                  }}
                /> */}
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="flex-start"
                flexDirection="column"
                sx={{ color: darkblue[900] }}
              >
                {/* <Typography>
                  <Tooltip title="Subjects">
                    <MenuBookIcon />
                  </Tooltip>
                  {userDetails.subjects.map((subject: string) => (
                    <h5 key={subject}>{subject}</h5>
                  ))}
                </Typography> */}

                <Typography>
                  <Tooltip title="Email">
                    <EmailIcon />
                  </Tooltip>
                  <h5>{userDetails.universityMail}</h5>
                </Typography>

                <Typography>
                  <Tooltip title="Phone No">
                    <CallIcon />
                  </Tooltip>
                  <h5>{userDetails.phoneNumber}</h5>
                </Typography>

                {/* <Typography>
                  <Tooltip title="Current state">
                    <WorkIcon />
                  </Tooltip>
                  <h5>{userDetails.status}</h5>
                </Typography> */}
              </Box>
            </CardContent>
          </Card>
        )}
      </Grid>
      {/* <Grid
        item
        sm={7}
        container
        sx={{ mt: 5, display: "flex", justifyContent: "space-around" }}
      >
        {stats && (
          <>
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
                  <CardHeader title="Students" />
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
                    {stats.students}
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
                  <CallReceivedSharpIcon sx={{ color: "green", fontSize: 40 }} />
                  <Typography sx={{ color: "Darkblue", fontSize: 30 }}>
                    {stats.requests}
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
                  <CardHeader title="Coins" />
                </Box>
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <MonetizationOnIcon sx={{ color: "#E5B80B", fontSize: 40 }} />
                  <Typography sx={{ color: "Darkblue", fontSize: 30 }}>
                    {stats.coins}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid> */}
    </Grid>
  );
}
