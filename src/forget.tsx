import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import forgot from "./forgot.jpg";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"; import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axios from "axios";
import { CircularProgress } from "@mui/material";


const defaultTheme = createTheme();

interface Input {
  Email: string;
}
const initialState: Input = {
  Email: "",
};

const schema = z.object({
  Email: z.string().min(1, "Enter your mail").email("Enter a valid email"),
});

const Forgot = () => {
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
    console.log("Submitting email:", data);
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:5025/api/Password/forgot-password",
        data
      );



      if (response.status === 200) {
        toast.success("OTP send successfully,Check your mail");
        reset(initialState);
        navigate("/OTP");}
      // } else  {
      //   toast.error("Email is not found");
      // }
      setIsLoading(false);
    } catch (error) {
      toast.error("Email is not found");
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
                Forgot Password
              </Typography>

              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <img src={forgot} alt="forgot" width={200} height={200} />
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
                Don’t worry, it happens to the best of us.
              </Typography>

              <TextField
                sx={{
                  borderRadius: 1,
                }}
                fullWidth
                label=" Your mail"
                variant="standard"
                {...register("Email")}
                error={!!errors.Email}
                helperText={errors.Email?.message}
              />
              <Box
                display={"flex"}
                justifyContent={"center"}

              >
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    mt: 5,
                    mb: 2,
                  }}
                // component={RouterLink}
                // to="/OTP"
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

export default Forgot;
