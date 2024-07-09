import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  AppBar,
  IconButton,
  InputAdornment,
  MenuItem,
  styled,
  TextField,
  Toolbar,
} from "@mui/material";
import { z } from "zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { districts, grades } from "./data/data";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define interface for form values
interface FormValues {
  firstName: string;
  lastName: string;
  grade: string;
  schoolName: string;
  address: string;
  password: string;
  district: string;
  phoneNumber: string;
  email: string;
}
const initialState: FormValues = {
  firstName: "",
  lastName: "",
  grade: "",
  schoolName: "",
  address: "",
  password: "",
  district: "",
  phoneNumber: "",
  email: "",
};
const schemaStudent = z.object({
  firstName: z.string().min(1, "Firstname is required"),
  lastName: z.string().min(1, "Lastname is required"),
  password: z
    .string()
    .min(8, "Password atleast have 8 charactors")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
  grade: z.string().min(1, "Grade is required"),
  address: z.string().min(1, "Address is required"),
  schoolName: z.string().min(1, "Schoolname is required"),
  district: z.string().min(1, "District is required"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .refine(
      (value) => /^07\d{8}$/.test(value ?? ""),
      "Phone number is not valid"
    ),
  email: z.string().min(1, "Email is required").email("Enter valid email"),
});

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


const StudentForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const {
    control,
    register,
    reset,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schemaStudent),
    defaultValues: initialState,
  });

  // Function to handle form submission
  const onSubmit = async (data: FormValues) => {
    console.log("Submitting form data:", data);
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:5025/api/Student/create",
        data
      );
      if (response.status === 201) {
        toast.success("Form submitted successfully");
        reset(initialState);
        navigate("/");
      } else {
        toast.error("Form submission failed");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container sx={{ height: "120vh" }}>
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
        <Grid
          container
          sm={12}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            sx={{
              width: 900,
              padding: 3,
              border: "1px solid #ccc",
              borderRadius: 5,
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#FFFFFF ",
            }}
          >
            <Typography
              component="h4"
              variant="h4"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Registration Form
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={1} gap={2} mt={3}>
                <Grid container spacing={1}>
                  <Grid item sm={6}>
                    <TextField
                      sx={{ backgroundColor: "#DAF3F9", borderRadius: 1 }}
                      label="First Name"
                      variant="standard"
                      fullWidth
                      {...register("firstName")}
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <TextField
                      sx={{ backgroundColor: "#DAF3F9", borderRadius: 1 }}
                      label="Last Name"
                      variant="standard"
                      fullWidth
                      {...register("lastName")}
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={1}>
                  <Grid item sm={6}>
                    <TextField
                      sx={{
                        backgroundColor: "#DAF3F9",
                        borderRadius: 1,
                      }}
                      select
                      label="Grade"
                      fullWidth
                      inputProps={{ name: "grade", id: "grade" }}
                      {...register("grade")}
                      error={!!errors.grade}
                      helperText={errors.grade?.message}
                    >
                      {grades.map((grade) => (
                        <MenuItem key={grade} value={grade}>
                          {grade}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item sm={6}>
                    <TextField
                      sx={{
                        backgroundColor: "#DAF3F9",
                        borderRadius: 1,
                      }}
                      label="District"
                      select
                      fullWidth
                      {...register("district")}
                      error={!!errors.district}
                      helperText={errors.district?.message}
                    >
                      {districts.map((district) => (
                        <MenuItem key={district} value={district}>
                          {district}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <Grid container spacing={1} pl={1}>
                  <TextField
                    sx={{
                      backgroundColor: "#DAF3F9",
                      borderRadius: 1,
                    }}
                    fullWidth
                    label="Address"
                    variant="standard"
                    {...register("address")}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                </Grid>
                <Grid container spacing={1}>
                  <Grid item sm={6}>
                    <TextField
                      sx={{
                        backgroundColor: "#DAF3F9",
                        borderRadius: 1,
                      }}
                      fullWidth
                      label="School Name"
                      variant="standard"
                      {...register("schoolName")}
                      error={!!errors.schoolName}
                      helperText={errors.schoolName?.message}
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <TextField
                      sx={{
                        backgroundColor: "#DAF3F9",
                        borderRadius: 1,
                      }}
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword((prev) => !prev)}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      label="Password"
                      variant="standard"
                      {...register("password")}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={1}>
                  <Grid item sm={6}>
                    <TextField
                      sx={{
                        backgroundColor: "#DAF3F9",
                        borderRadius: 1,
                      }}
                      fullWidth
                      label="Phone Number"
                      variant="standard"
                      {...register("phoneNumber")}
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber?.message}
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <TextField
                      sx={{
                        backgroundColor: "#DAF3F9",
                        borderRadius: 1,
                      }}
                      label="Email"
                      fullWidth
                      variant="standard"
                      {...register("email")}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Box display={"flex"} justifyContent={"flex-end"}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    mt: 3,
                    width: 100,
                    color: "white",
                    backgroundColor: "#1e90ff",
                    borderRadius: "20px",
                    "&:hover": {
                      backgroundColor: "#1e90ff",
                    },
                  }}
                >
                  Register
                </Button>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default StudentForm;
