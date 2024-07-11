import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FilePicker from "../common/FilePicker";
import SideDrawer from "../common/SideDrawer";
import { mediums, modes, weekdays } from "../../data/data";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  UploadResult,
} from "firebase/storage";
import { storage } from "../../firebase";
import { toast } from "react-toastify";
import { Close } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";

export interface SubjectInputs {
  _id?: number;
  tutorId?: number;
  title: string;
  description: string;
  coverImage: string;
  medium: string[];
  mode: string;
  availability: string[];
}

const initialValues: SubjectInputs = {
  title: "",
  description: "",
  coverImage: "",
  medium: [],
  mode: "",
  availability: [],
};

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  coverImage: z.string().min(1, "Cover Image is required"),
  medium: z.array(z.string()).min(1, "Medium is required"),
  mode: z.string().min(1, "Mode is required"),
  availability: z.array(z.string()).min(1, "Availability is required"),
});

export default function SubjectForm({
  open,
  subject,
  fetchSubjects,
  closeDrawer,
}: {
  open: boolean;
  subject: SubjectInputs | null;
  fetchSubjects: () => void;
  closeDrawer: () => void;
}) {
  const {
    register,
    getValues,
    setValue,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectInputs>({
    defaultValues: initialValues,
    resolver: zodResolver(schema),
  });

  const watchAvailability = watch("availability");
  const watchMedium = watch("medium");
  const watchCoverImage = watch("coverImage");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (subject) {
      reset(subject);
    }
  }, [subject, open]);

  const onSubmit = async (data: SubjectInputs) => {
    const tutorId = localStorage.getItem("userId");
    if (subject) {
      try {
        setIsLoading(true);
        const response = await axios.put(
          `http://localhost:5025/api/Subject/update/${subject._id}`,
          data
        );
        if (response.status === 200) {
          toast.success("Subject updated successfully");
          handleClose();
          fetchSubjects();
        } else {
          toast.error("Subject update failed");
        }
        setIsLoading(false);
      } catch (error) {
        toast.error("Somthing went wrong");
        setIsLoading(false);
      }
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://localhost:5025/api/Subject/createsubject/${tutorId}`,
        data
      );
      if (response.status === 201) {
        toast.success("Subject created successfully");
        handleClose();
        fetchSubjects();
      } else {
        toast.error("Subject creation failed");
      }
      setIsLoading(false);
    } catch (error) {
      toast.error("Somthing went wrong");
      setIsLoading(false);
    }
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files?.[0]);
    if (event.target.files === null) return;
    const file = event.target.files[0];
    if (file === undefined) return;
    const imgRef = ref(storage, "/subjects/" + file?.name);
    const snapshot = uploadBytes(imgRef, file).then(
      async (snapshot: UploadResult) => {
        const url = await getDownloadURL(snapshot.ref);
        console.log(url);
        setValue("coverImage", url);
        toast.success("Subject image uploaded successfully");
      }
    );
  };

  const handleAvailability = (
    event: SelectChangeEvent<typeof watchAvailability>
  ) => {
    const {
      target: { value },
    } = event;
    setValue(
      "availability",
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleMedium = (event: SelectChangeEvent<typeof watchMedium>) => {
    const {
      target: { value },
    } = event;
    setValue("medium", typeof value === "string" ? value.split(",") : value);
  };

  const handleClose = () => {
    reset(initialValues);
    closeDrawer();
  };

  return (
    <SideDrawer open={open} closeDrawer={handleClose}>
      <Box>
        <Typography variant="h5" sx={{ p: 2 }}>
          {subject ? "Edit Subject" : "Add Subject"}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            size="small"
            label="Subject Name"
            variant="outlined"
            fullWidth
            sx={{ mb: 1 }}
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <TextField
            size="small"
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 1 }}
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          <Box mb={1}>
            <FormControl>
              <FilePicker
                label="Upload subject cover image"
                accept="image/jpg,image/jpeg,image/png"
                onUpload={handleUpload}
              />
              <FormHelperText error={!!errors.coverImage}>
                {errors.coverImage?.message}
              </FormHelperText>
            </FormControl>
            {watchCoverImage && (
              <Box
                sx={{
                  my: 1,
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
                    setValue("coverImage", "");
                  }}
                >
                  <Close />
                </IconButton>
                <img
                  src={watchCoverImage}
                  alt="cover_img"
                  style={{
                    width: 150,
                    objectFit: "cover",
                  }}
                />
              </Box>
            )}
          </Box>

          <FormControl
            fullWidth
            sx={{ mb: 1 }}
            size="small"
            error={!!errors.medium}
          >
            <InputLabel id="medium-checkbox">Medium</InputLabel>
            <Select
              labelId="medium-checkbox"
              multiple
              value={watchMedium}
              onChange={handleMedium}
              input={<OutlinedInput label="Medium" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {mediums.map((medium) => (
                <MenuItem key={medium} value={medium}>
                  <Checkbox checked={watchMedium.indexOf(medium) > -1} />
                  <ListItemText primary={medium} />
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error={!!errors.medium}>
              {errors.medium?.message}
            </FormHelperText>
          </FormControl>

          <TextField
            select
            size="small"
            label="Mode"
            variant="outlined"
            fullWidth
            sx={{ mb: 1 }}
            {...register("mode")}
            error={!!errors.mode}
            helperText={errors.mode?.message}
          >
            <MenuItem value="" sx={{ color: "#bbb" }}>
              Select Mode
            </MenuItem>
            {modes.map((mode) => (
              <MenuItem key={mode} value={mode}>
                {mode}
              </MenuItem>
            ))}
          </TextField>

          <FormControl
            fullWidth
            sx={{ mb: 1 }}
            size="small"
            error={!!errors.availability}
          >
            <InputLabel id="weekdays-checkbox">Availability</InputLabel>
            <Select
              labelId="weekdays-checkbox"
              multiple
              value={watchAvailability}
              onChange={handleAvailability}
              input={<OutlinedInput label="Availability" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {weekdays.map((day) => (
                <MenuItem key={day} value={day}>
                  <Checkbox checked={watchAvailability.indexOf(day) > -1} />
                  <ListItemText primary={day} />
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error={!!errors.availability}>
              {errors.availability?.message}
            </FormHelperText>
          </FormControl>

          <Divider />

          <Button
            variant="contained"
            disabled={isLoading}
            fullWidth
            type="submit"
            sx={{ mb: 2 }}
          >
            {subject ? "Update Subject" : "Add Subject"}
          </Button>
          <Button variant="outlined" fullWidth onClick={handleClose}>
            Cancel
          </Button>
        </form>
      </Box>
    </SideDrawer>
  );
}
