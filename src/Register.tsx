import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tutor from "./Tutor.jpg";
import Student from "./student.png";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar } from "@mui/material";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


const Register = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container sx={{ height: "100vh" }}>
        <CssBaseline />
        <Box width="100vw">
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="h6" color="inherit" component="div">
                Uni Tutor
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Grid item sm={12}>
          <Box
            display={"flex"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
          >
            <Box
              sx={{
                width: 400,
                height: 525,
                marginTop: 8,
                padding: 3,
                border: "1px solid #ccc",
                borderRadius: 5,
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#ffffff ",
                mt: 1,
              }}
            >
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography component="h1" variant="h4">
                  Register as Student
                </Typography>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <img src={Student} alt="Student" width={200} height={200} />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: 15,
                    color: "#1a237e",
                    textAlign: "center",
                    mt: 3,
                  }}
                >
                  "Explore flexible learning options to fit your schedule, 
                  connecting with tutors effortlessly through our user-friendly platform. 
                  Begin your journey towards academic success with our supportive community of students. 
                  Join now and start making strides in your educational path!"
                </Typography>
              </Box>

              <Box display={"flex"} justifyContent={"space-around"}>
                <Button
                  type="submit"
                  variant="contained"
                  component={RouterLink} to="/StudentForm"
                  sx={{ mt: 2, mb: 2 }}
                >
                  SignUp
                </Button>
              </Box>
            </Box>
            <Box>
              <Box
                sx={{
                  width: 400,
                  height: 525,
                  marginTop: 8,
                  padding: 3,
                  border: "1px solid #ccc",
                  borderRadius: 5,
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#ffffff ",
                  mt: 1,
                }}
              >
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Typography component="h1" variant="h4">
                    Register as Tutor
                  </Typography>
                </Box>
                <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <img src={Tutor} alt="Tutor" width={200} height={200}  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "Literata Bold Italics",
                      fontSize: 15,
                      color: "#1a237e",
                      textAlign: "center",
                      mt: 3,
                    }}
                  >
                    "Set your availability, connecting with eager learners through our platform's intuitive interface, and start making a tangible difference in their educational journey. 
                    Join our vibrant and supportive community of tutors today!"
                  </Typography>
                </Box>

                <Box display={"flex"} justifyContent={"space-around"}>
                  <Button
                    component={RouterLink} to="/TutorForm1"
                    type="submit"
                    variant="contained"
                    sx={{ mt: 5, mb: 2 }}
                  >
                    SignUp
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Register;
