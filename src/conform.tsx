import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

function isValidEmail(email: string): boolean {
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password: string): boolean {
  // Password strength validation
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

const Conform = () => {
  const [emailError, setEmailError] = React.useState<string>("");
  const [passwordError, setPasswordError] = React.useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    // Validate email
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError("");
    }

    // Validate password
    if (!password || !isValidPassword(password)) {
      // Check if password is empty or invalid
      setPasswordError(
        "Password should have only 8 characters long and contain at least one letter, one number, and one special character."
      );
      return;
    } else {
      setPasswordError("");
    }

    // If validation passes, continue with form submission
    console.log({ email, password });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError(""); // Clear email error when email input changes
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordError(""); // Clear password error when password input changes
  };

  const [type, setType] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Grid container sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item container sm={8}
        >
          <Box
            height={350}
            width={1000}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography
              sx={{
                fontSize: 40,
                color: "#1565c0",
              }}
            >
              <h1>Uni Tutor</h1>
            </Typography>
          </Box>

          <Box
            height={200}
            marginLeft={3}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"flex-start"}
          >
            <Typography
              sx={{
                fontSize: 30,
                color: "#1a237e",
                textAlign: "center",
              
              }}
            >
              “Empower students through interactive personalized online
              learning.”
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={4}>
          <Box
            sx={{
              width: 400,
              height: emailError || passwordError ? 585 : 545,
              marginTop: 6,
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
            >
              <Typography component="h1" variant="h5">
                Login
              </Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Avatar sx={{ m: 2, bgcolor: "primary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
            </Box>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={Boolean(emailError)}
                helperText={emailError}
                onChange={handleEmailChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={Boolean(passwordError)}
                helperText={passwordError}
                onChange={handlePasswordChange}
              />

              <FormControl fullWidth sx={{
                mt:2.5,
              }}>
              
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Type"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Student</MenuItem>
                  <MenuItem value={20}>Tutor</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                
                sx={{ mt: 3, mb: 2 }}
              >
                LogIn
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link component={RouterLink} to="/forgot" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/Register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ mt: 0 }}
              >
                {"Copyright © "}
                <Link color="inherit" href="">
                  UniTutor
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Conform;
