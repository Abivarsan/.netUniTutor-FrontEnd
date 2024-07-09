import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import tick from "./tick.png"
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ResetSuccess() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container sx={{ height: "100vh" }}>
        <CssBaseline />
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
              }}
            >
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={
                  {
                    mt:3
                  }
                }
              >
                <img src={tick} alt="Success" width={150} height={140}  />
                </Box>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                color={"green"}
                sx={{
                  fontFamily: "Literata Bold Italics",
                }}
              >
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{
                    fontFamily: "Literata Bold Italics",
                  }}
                >
                  Succesfully Reseted
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Literata Bold Italics",
                    fontSize: 20,
                    color: "#1a237e",
                    textAlign: "center",
                    mt: 5,
                  }}
                >
                  {" "}
                  You can now log in to your account
                </Typography>
              </Box>

              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 6 }}
              >
                <Box display={"flex"} justifyContent={"center"}>
                  <Button
                    type="submit"
                    variant="contained"
                    component={RouterLink}
                    to="/"
                    sx={{ mt: 11, mb: 2 }}
                  >
                    Log in
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
