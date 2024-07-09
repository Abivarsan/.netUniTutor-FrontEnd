import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  makeStyles,
  NativeSelect,
  Radio,
  RadioGroup,
  TextField,
  Toolbar,
} from "@mui/material";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const TutorForm2 = () => {
  const [state, setState] = React.useState({
    English: false,
    Tamil: false,
    Sinhala: false,
    Sun: false,
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  const { English, Tamil, Sinhala, Sun, Mon, Tue, Wed, Thu, Fri, Sat } = state;
  const error =
    [English, Tamil, Sinhala, Sun, Mon, Tue, Wed, Thu, Fri, Sat].filter(
      (v) => v
    ).length !== 2;
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
                width: 700,
                height: 550,
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
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{
                    fontFamily: "monospace",
                  }}
                >
                  Registration Form
                </Typography>
              </Box>

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
                    mt: 2,
                  }}
                >
                  Other Details
                </Typography>
              </Box>
              <FormControl
                sx={{
                  mt: 2,
                }}
              >
                <FormLabel>Teaching mode</FormLabel>
                <Box
                  sx={{
                    ml: 7,
                  }}
                >
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Physical"
                      control={<Radio />}
                      label="Physical"
                    />
                    <FormControlLabel
                      value="Online"
                      control={<Radio />}
                      label="Online"
                    />
                    <FormControlLabel
                      value="Both"
                      control={<Radio />}
                      label="Both"
                    />
                  </RadioGroup>
                </Box>
              </FormControl>
              <FormControl>
                <FormGroup row>
                  <FormLabel>Medium</FormLabel>
                  <Box
                    sx={{
                      mt: 2,
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={English}
                          onChange={handleChange}
                          name="English"
                        />
                      }
                      label="English"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Tamil}
                          onChange={handleChange}
                          name="Tamil"
                        />
                      }
                      label="Tamil"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Sinhala}
                          onChange={handleChange}
                          name="Sinhala"
                        />
                      }
                      label="Sinhala"
                    />
                  </Box>
                </FormGroup>
              </FormControl>

              <div>
                <Grid container item sm={12}>
                  <Grid item sm={6}>
                    <TextField
                      sx={{ backgroundColor: "#FFFFFF ", mt: 3 }}
                      required
                      label="Subject"
                      variant="standard"
                    />
                  </Grid>
                </Grid>
              </div>

              <div>
                <TextField
                  sx={{ backgroundColor: "#FFFFFF ", mt: 3, width: 350 }}
                  id="filled-multiline-flexible"
                  required
                  label="Academic and Professional Qualifications"
                  multiline
                  maxRows={4}
                  variant="standard"
                />
              </div>
              <FormControl>
              <FormGroup
                row
                sx={{
                  mt: 2,
                }}
              >
                
                <FormLabel>Availability</FormLabel>
                <Box
                  sx={{
                    mt: 2,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Sun}
                        onChange={handleChange}
                        name="Sun"
                      />
                    }
                    label="Sun"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Mon}
                        onChange={handleChange}
                        name="Mon"
                      />
                    }
                    label="Mon"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Tue}
                        onChange={handleChange}
                        name="Tue"
                      />
                    }
                    label="Tue"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Wed}
                        onChange={handleChange}
                        name="Wed"
                      />
                    }
                    label="Wed"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Thu}
                        onChange={handleChange}
                        name="Thu"
                      />
                    }
                    label="Thu"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Fri}
                        onChange={handleChange}
                        name="Fri"
                      />
                    }
                    label="Fri"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Sat}
                        onChange={handleChange}
                        name="Sat"
                      />
                    }
                    label="Sat"
                  />
                </Box>
              </FormGroup>
              </FormControl>

              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 0, mb: 2, mr: 5 }}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  component={RouterLink}
                  to="/TutorFormContinue1"
                  sx={{ mt: 0, mb: 2 }}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default TutorForm2;
