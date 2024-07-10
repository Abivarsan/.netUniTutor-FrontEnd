import Imgreset from "./Imgreset.png";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axios from "axios";
import React from "react";
import { CircularProgress, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const defaultTheme = createTheme();

interface Input {
  NewPassword: string;
}
const initialState: Input = {
  NewPassword: "",
};

const schema = z.object({
  NewPassword: z
    .string()
    .min(8, "Password must have at least 8 characters")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
});

const Reset = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    resolver: zodResolver(schema),
    defaultValues: initialState,
  });

  const onSubmit = async (data: Input) => {
    console.log("Reset password:", data);
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:5025/api/Password/reset-password",
        data
      );

      if (response.status === 200) {
        toast.success("Password reset successfully");
        reset(initialState);
        navigate("/resetSux");
      }

      setIsLoading(false);
    } catch (error) {
      toast.error("Password reset failed");
      console.error("Error resetting password:", error);
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          sm={12}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                width: 400,
                height: 540,
                marginTop: 8,
                padding: 3,
                border: "1px solid #ccc",
                borderRadius: 5,
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#ffffff ",
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Reset Password
              </Typography>

              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <img src={Imgreset} alt="reset" width={200} height={200} />
              </Box>

              <Typography
                sx={{
                  fontSize: 20,
                  color: "#1a237e",
                  textAlign: "center",
                  mt: 2,
                }}
              >
                Password must have at least 8 characters. Use a combination of numbers, uppercase, lowercase, and special characters.
              </Typography>

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
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                label="Password"
                variant="standard"
                {...register("NewPassword")}
                error={!!errors.NewPassword}
                helperText={errors.NewPassword?.message}
              />
              <Box display={"flex"} justifyContent={"center"}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  

                  sx={{
                    mt: 5,
                    mb: 2,
                  }}
                >
                  {isLoading ? <CircularProgress size="1.6rem" /> : "Reset Password"}
                </Button>
              </Box>
            </Box>
          </form>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Reset;
