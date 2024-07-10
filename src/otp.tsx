import checkmail from "./checkmail.png";
import { Link as RouterLink } from "react-router-dom";
import * as React from "react";
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
import { CircularProgress } from "@mui/material";

const defaultTheme = createTheme();

interface Input {
  VerificationCode: string;
}
const initialState: Input = {
  VerificationCode: "",
};

const schema = z.object({
  VerificationCode: z.string().min(1, "Enter otp").max(6, "Enter a valid OTP"),
});

const Otp = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const {
    control,
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    resolver: zodResolver(schema),
    defaultValues: initialState,
  });

  const onSubmit = async (data: Input) => {
    console.log("verified OTP", data);
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:5025/api/Password/verify-otp",
        data
      );

      if (response.status === 200) {
        toast.success("Verified successfully" );
        reset(initialState);
        navigate("/resetpassword");
      }

      setIsLoading(false);
    } catch (error) {
      toast.error("Invalid OTP, Please try again");
      console.error("Error submitting email:", error);
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
                height: 525,
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
                Check Your Email
              </Typography>

              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <img src={checkmail} alt="checkmail" width={200} height={200} />
              </Box>

              <Typography
                sx={{
                  fontFamily: "Literata Bold Italics",
                  fontSize: 20,
                  color: "#1a237e",
                  textAlign: "center",
                  mt: 2,
                }}
              >
                We just sent an OTP to your registered email address.
              </Typography>

              <TextField
                sx={{
                  borderRadius: 1,
                }}
                fullWidth
                label="Enter OTP"
                variant="standard"
                {...register("VerificationCode")}
                error={!!errors.VerificationCode}
                helperText={errors.VerificationCode?.message}
              />
              <Box display={"flex"} justifyContent={"center"}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size="1rem" /> : null}

                  sx={{
                    mt: 5,
                    mb: 2,
                  }}
                  // component={RouterLink}
                  // to="/resetpassword"
                >
                {isLoading ? "Verifying..." : "Verify otp"}
                </Button>
              </Box>
            </Box>
          </form>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Otp;
