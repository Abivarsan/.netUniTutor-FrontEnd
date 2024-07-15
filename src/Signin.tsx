import * as React from "react";
import { useNavigate } from "react-router-dom";
 import { jwtDecode } from "jwt-decode";
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
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { toast } from "react-toastify";
import { set } from "date-fns";

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password: string): boolean {
  if (password.length < 8) {
    return false;
  }
  if (!/[0-9]/.test(password)) {
    return false;
  }
  if (!/[a-z]/.test(password)) {
    return false;
  }
  if (!/[A-Z]/.test(password)) {
    return false;
  }
  if (!/[^a-zA-Z0-9]/.test(password)) {
    return false;
  }
  return true;
}

const SignInSide = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = React.useState<string>("");
  const [passwordError, setPasswordError] = React.useState<string>("");
  const [type, setType] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError("");
    }

    if (!password || !isValidPassword(password)) {
      setPasswordError(
        "Password must have at least 8 characters and include a combination of numbers, uppercase, lowercase, and special characters."
      );
      return;
    } else {
      setPasswordError("");
    }

    let endpoint;
    if (type === "10") {
      endpoint = "http://localhost:5025/api/Student/login";
    } else if (type === "20") {
      endpoint = "http://localhost:5025/api/Tutor/login";
    } else {
      endpoint = "http://localhost:5025/api/Admin/adminLogin";
    }

    const formData = {
      email,
      password,
    };

    try {
      setIsLoading(true);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        
        console.log("Login successful:", responseData);

        const decodedToken: any = jwtDecode(responseData.token);
        const email=decodedToken?.unique_name;
        
        localStorage.setItem("email", email);
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("userId", decodedToken.nameid); // Assuming nameid is the user ID
        localStorage.setItem("userRole", decodedToken.role); // Assuming role is the user role

        if (type === "10") {
          navigate("./Student/Dashboard");
        } else if (type === "20") {
          navigate("./Tutor/Dashboard");
        } else {
          navigate("/Admin");
        }
      } else {
        
        console.error("Login failed:", response.statusText);
        toast.error("Invalid email or password. Please try again.");
      }
      setIsLoading(false);
     

    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError(""); 
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordError(""); 
  };

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Grid container sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item container sm={8}>
          <Box
            height={350}
            width={1000}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography
              component="h1"
              variant="h2"
              sx={{
                color: "Darkblue",
              }}
            >
               Welcome to  UniTutor!
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
                color: "Darkblue",
                textAlign: "center",
              }}
            >
              “Empower students through interactive personalized online learning.”
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

              <FormControl fullWidth sx={{ mt: 2.5 }}>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Type"
                  onChange={handleChange}
                >
                  <MenuItem value="10">Student</MenuItem>
                  <MenuItem value="20">Tutor</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size="1.4rem" /> : null}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isLoading ? "Logging in..." : "Login"}
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

export default SignInSide;
