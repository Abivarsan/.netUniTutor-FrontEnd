import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  AppBar,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  NativeSelect,
  Radio,
  RadioGroup,
  TextField,
  Toolbar,
  styled,
} from "@mui/material";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  UploadResult,
} from "firebase/storage";
import { storage } from "./firebase";
import { toast } from "react-toastify";
import axios from "axios";
import { districts, occupations } from "./data/data";

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

interface RegisterInputs {
  firstName: string;
  lastName: string;
  password: string;
  occupation: string;
  address: string;
  district: string;
  phoneNumber: string;
  universityMail: string;
  qualifications: string;
  cv: string;
  universityID: string;
}

const initialState: RegisterInputs = {
  firstName: "",
  lastName: "",
  password: "",
  occupation: "",
  address: "",
  district: "",
  phoneNumber: "",
  universityMail: "",
  qualifications: "",
  cv: "",
  universityID: "",
};

const schema = z.object({
  firstName: z.string().min(1, "Firstname is required"),
  lastName: z.string().min(1, "Lastname is required"),
  password: z
    .string()
    .min(8, "Password atleast have 8 charactors")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
  occupation: z.string().min(1, "occupation is required"),
  address: z.string().min(1, "address is required"),
  district: z.string().min(1, "district is required"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .refine(
      (value) => /^07\d{8}$/.test(value ?? ""),
      "Phone number is not valid"
    ),
  universityMail: z
    .string()
    .min(1, "universityMail is required")
    .email("Enter valid email"),
  qualifications: z.string().min(1, "qualifications is required"),
  cv: z.string().min(1, "Cv is required"),
  universityID: z.string().min(1, "UniversityID is required"),
});

const TutorForm1 = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    control,
    register,
    reset,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: zodResolver(schema),
    defaultValues: initialState,
  });

  const watchCV = watch("cv");
  const watchID = watch("universityID");

  const onSubmit = async (data: RegisterInputs) => {
    console.log("Submitting form data:", data);
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:5025/api/Tutor/create",
        data
      );
      if (response.status === 201) {
        toast.success("Form submitted successfully");
        reset(initialState);
      } else {
        toast.error("Form submission failed");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsLoading(false);
    }
  };

  // const handleMedium = (medium: string) => (event: any) => {
  //   if (event.target.checked) {
  //     setValue("medium", [...watchMedium, medium]);
  //   } else {
  //     setValue(
  //       "medium",
  //       watchMedium.filter((m) => m !== medium)
  //     );
  //   }
  // };

  const handleUploadCv = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files?.[0]);
    if (event.target.files === null) return;
    const file = event.target.files[0];
    if (file === undefined) return;
    const imgRef = ref(storage, "/cv/" + file?.name);
    const snapshot = uploadBytes(imgRef, file).then(
      async (snapshot: UploadResult) => {
        const url = await getDownloadURL(snapshot.ref);
        console.log("URL = ", url);
        setValue("cv", url);
        toast.success("File uploaded successfully");
      }
    );
  };

  const handleUploadId = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Implement file upload for ID
    console.log(event.target.files?.[0]);
    if (event.target.files === null) return;
    const file = event.target.files[0];
    if (file === undefined) return;
    const imgRef = ref(storage, "/ids/" + file?.name);
    const snapshot = uploadBytes(imgRef, file).then(
      async (snapshot: UploadResult) => {
        const url = await getDownloadURL(snapshot.ref);
        console.log("URL = ", url);
        setValue("universityID", url);
        toast.success("File uploaded successfully");
      }
    );
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container sx={{ height: "auto" }}>
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
                width: 900,
                height: "auto",
                padding: 3,
                border: "1px solid #ccc",
                borderRadius: 5,
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#ffffff",
                mt: 1,
              }}
            >
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography
                  component="h4"
                  variant="h4"
                  sx={{ color: "darkblue" }}
                >
                  Registration Form
                </Typography>
              </Box>

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
                        select
                        sx={{
                          backgroundColor: "#DAF3F9",
                          borderRadius: 1,
                        }}
                        fullWidth
                        label="Occupation"
                        inputProps={{ name: "occupation", id: "occupation" }}
                        {...register("occupation")}
                        error={!!errors.occupation}
                        helperText={errors.occupation?.message}
                      >
                        {occupations.map((occupation) => (
                          <MenuItem key={occupation} value={occupation}>
                            {occupation}
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
                        fullWidth
                        label="Home Town"
                        select
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

                  <Grid container spacing={1}>
                    <Grid item sm={6}>
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
                  </Grid>

                  <Grid container spacing={1}>
                    <Grid item sm={6}>
                      <TextField
                        sx={{
                          backgroundColor: "#DAF3F9",
                          borderRadius: 1,
                        }}
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
                        fullWidth
                        label="Password"
                        variant="standard"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                      />
                    </Grid>{" "}
                    <Grid item sm={6}>
                      <TextField
                        sx={{
                          backgroundColor: "#DAF3F9",
                          borderRadius: 1,
                        }}
                        fullWidth
                        label="University Mail"
                        variant="standard"
                        {...register("universityMail")}
                        error={!!errors.universityMail}
                        helperText={errors.universityMail?.message}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={1}>
                    <Grid item sm={12}>
                      <TextField
                        sx={{
                          backgroundColor: "#DAF3F9",
                          borderRadius: 1,
                        }}
                        fullWidth
                        id="filled-multiline-flexible"
                        label="Academic & Professional Qualifications"
                        multiline
                        rows={3}
                        maxRows={5}
                        variant="standard"
                        {...register("qualifications")}
                        error={!!errors.qualifications}
                        helperText={errors.qualifications?.message}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={1}>
                    <Grid item sm={6}>
                      <Button
                        component="label"
                        variant="contained"
                        fullWidth
                        startIcon={<CloudUploadIcon />}
                        sx={{
                          backgroundColor: "#71BFD2",
                          color: "black",
                          "&:hover": {
                            backgroundColor: "#4BBBD6",
                          },
                        }}
                      >
                        Upload CV
                        <VisuallyHiddenInput
                          accept="image/*"
                          type="file"
                          onChange={handleUploadCv}
                        />
                      </Button>

                      {watchCV !== "" && (
                        <Box
                          sx={{
                            border: "1px solid #555",
                            borderRadius: "5px",
                            position: "relative",
                            width: "fit-content",
                          }}
                        >
                          <IconButton
                            sx={{
                              position: "absolute",
                              top: 5,
                              right: 5,
                              backgroundColor: "#ddd8",
                              width: 25,
                              height: 25,
                            }}
                            onClick={() => {
                              setValue("cv", "");
                            }}
                          >
                            <Close />
                          </IconButton>
                          <img
                            src={watchCV}
                            alt="cv_img"
                            style={{
                              width: 150,
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                      )}
                    </Grid>
                    <Grid item sm={6}>
                      <Button
                        variant="contained"
                        component="label"
                        fullWidth
                        startIcon={<CloudUploadIcon />}
                        sx={{
                          backgroundColor: "#71BFD2",
                          color: "black",
                          "&:hover": {
                            backgroundColor: "#4BBBD6",
                          },
                        }}
                      >
                        Upload ID
                        <VisuallyHiddenInput
                          accept="image/*"
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={handleUploadId}
                        />
                      </Button>

                      {watchID !== "" && (
                        <Box
                          sx={{
                            border: "1px solid #555",
                            borderRadius: "5px",
                            position: "relative",
                            width: "fit-content",
                          }}
                        >
                          <IconButton
                            sx={{
                              position: "absolute",
                              top: 5,
                              right: 5,
                              backgroundColor: "#ddd8",
                              width: 25,
                              height: 25,
                            }}
                            onClick={() => {
                              setValue("universityID", "");
                            }}
                          >
                            <Close />
                          </IconButton>
                          <img
                            src={watchID}
                            alt="id_img"
                            style={{
                              width: 150,
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Box display={"flex"} justifyContent={"flex-end"} mt={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    sx={{
                      mt: 1,
                      mb: 1,
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
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default TutorForm1;
