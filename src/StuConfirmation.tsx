import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import KeyIcon from '@mui/icons-material/Key';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputAdornments from './otpfield'
import { Link as RouterLink } from 'react-router-dom';
import tick from './tick.png';
import { AppBar, Toolbar } from "@mui/material";


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Conform() {


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
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
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
                mt:1,
              }}
            >
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography component="h1" variant="h5">
                  Check Your Email
                </Typography>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                    mt:6,
                }}
              >
                <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <img src={tick} alt="Success" width={110} height={100}  />
                </Box>
              </Box>
              <Box>
                <Typography
                 sx={{fontFamily: "Literata Bold Italics",
                fontSize: 25,
                color: "green",
                textAlign: "center",
                mt:5}}>Registration Completed Successfully!</Typography>
              </Box>
              <Box>
                <Typography
                 sx={{fontFamily: "Literata Bold Italics",
                fontSize: 17,
                color: "#1a237e",
                textAlign: "center",
                mt:5}}>We just sent an  confirmation mail to your registered email address. Please verify and set Username and Password.</Typography>
              </Box>
              <Box display={"flex"}
                justifyContent={"center"}>

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 4, mb: 2 }}
                    component={RouterLink} to="/login"
                  >
                    Ok
                  </Button>
                </Box>
             
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

