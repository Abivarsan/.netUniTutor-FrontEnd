import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  FormControl,
  FormLabel,
  InputLabel,
  makeStyles,
  NativeSelect,
  styled,
  TextField,
  Toolbar,
} from "@mui/material";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const TutorForm3 = () => {
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
                mt: 1,
              }}
            >
              <Box
                display={"flex"}
                justifyContent={"flex-start"}
                alignItems={"center"}
              >
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{
                    fontSize: 20,
                    fontFamily: "monospace",
                    mt: 7,
                  }}
                >
                  Upload Your Documents
                </Typography>
              </Box>

              <FormControl
                sx={{
                  mt: 8,
                }}
              >
                <FormLabel>Upload Your University ID</FormLabel>
                <Box
                  sx={{
                    mt: 2,
                    ml: 7,
                  }}
                >
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload ID
                    <VisuallyHiddenInput type="file" />
                  </Button>
                </Box>

                <FormLabel
                  sx={{
                    mt: 2,
                  }}
                >
                  Upload Your CV
                </FormLabel>
                <Box
                  sx={{
                    mt: 2,
                    ml: 7,
                  }}
                >
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload CV
                    <VisuallyHiddenInput type="file" />
                  </Button>
                </Box>
              </FormControl>
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 15, mb: 2, mr: 5 }}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 15, mb: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default TutorForm3;
