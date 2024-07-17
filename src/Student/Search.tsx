import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  CardHeader,
  Button,
  CardActions,
  Avatar,
  CardMedia,
  Divider,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  FormHelperText,
  Tooltip,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, Typography, Card, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { SubjectResponse } from "../data/interfaces";
import axios from "axios";
import { toast } from "react-toastify";
import { mediums, modes, weekdays } from "../data/data";
import AlertBox from "../components/common/Alert";
import PopupModal from "../components/common/PopupModal";
import SubjectModal from "./SubjectModal";
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Define the type for a tutor
interface Tutor {
  id: number;
  name: string;
  location: string;
  subjects: string;
  medium: string;
  availability: string;
  rating: number; // Added rating property
}

const darkblue = {
  100: "#C9DCF7",
  200: "#789CFF",
  400: "#3A66FF",
  500: "#0044FF",
  600: "#0037CC",
  900: "#001B80",
};

const SearchSt = () => {
  const [subjects, setSubjects] = useState<SubjectResponse[]>([]);
  const [searchResults, setSearchResults] = useState<SubjectResponse[]>([]);

  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [mediumFilter, setMediumFilter] = useState<string[]>([]);
  const [availabilityFilter, setAvailabilityFilter] = useState<string[]>([]);
  const [modeFilter, setModeFilter] = useState<string[]>([]);

  const [isRequestAlertOpen, setIsRequestAlertOpen] = useState<boolean>(false);
  const [subjectId, setSubjectId] = useState<number | null>(null);
  const [tutorId, setTutorId] = useState<number | null>(null);

  const [selectedSubject, setSelectedSubject] =
    useState<SubjectResponse | null>(null);

  const handleSearch = () => {
    setIsFiltering(true);
    let results = subjects.filter((subject) => {
      let isMatch = true;
      if (searchTerm) {
        isMatch = subject.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }
      if (mediumFilter.length > 0) {
        isMatch =
          isMatch &&
          mediumFilter.some((medium) => subject.medium.includes(medium));
      }
      if (availabilityFilter.length > 0) {
        isMatch =
          isMatch &&
          availabilityFilter.some((day) => subject.availability.includes(day));
      }
      if (modeFilter.length > 0) {
        isMatch =
          isMatch && modeFilter.some((mode) => subject.mode.includes(mode));
      }
      return isMatch;
    });
    setSearchResults(results);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setMediumFilter([]);
    setAvailabilityFilter([]);
    setModeFilter([]);
    setIsFiltering(false);
    setSearchResults(subjects);
  };

  const fetchAllSubjects = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5025/api/Subject/getall`
      );
      if (response.status === 200) {
        setSubjects(response.data);
        return;
      }
      toast.error("Failed to fetch subjects");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchAllSubjects();
  }, []);

  const handleRequest = async () => {
    try {
      const studentId = localStorage.getItem("userId");
      const studentEmail = localStorage.getItem("email");
      await axios.post(`http://localhost:5025/api/Request/request`, {
        studentId,
        subjectId,
        tutorId,
        studentEmail,
        timestamp: new Date(),
      });
      setIsRequestAlertOpen(false);
      setSubjectId(subjectId);
      setTutorId(tutorId);
      toast.success("Subject requested successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to request subject");
    }
  };

  const subjectsList = isFiltering ? searchResults : subjects;

  return (
    <>
      <Box p={1}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Search subjects */}
          <TextField
            sx={{
              width: {
                xs: "100%",
                md: "300px",
              },
            }}
            size="small"
            placeholder="Search subjects"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: "#bbb", mr: 1 }} />,
            }}
          />

          {/* Medium Filter */}
          <FormControl
            size="small"
            sx={{
              width: {
                xs: "100%",
                md: "200px",
              },
            }}
          >
            <InputLabel id="medium-checkbox">Medium</InputLabel>
            <Select
              labelId="medium-checkbox"
              multiple
              input={<OutlinedInput label="Medium" />}
              value={mediumFilter}
              onChange={(e) => setMediumFilter(e.target.value as string[])}
              renderValue={(selected) => selected.join(", ")}
            >
              {mediums.map((medium) => (
                <MenuItem key={medium} value={medium}>
                  <Checkbox checked={mediumFilter.indexOf(medium) > -1} />
                  <ListItemText primary={medium} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Availability Filter */}
          <FormControl
            size="small"
            sx={{
              width: {
                xs: "100%",
                md: "200px",
              },
            }}
          >
            <InputLabel id="availability-checkbox">Availability</InputLabel>
            <Select
              labelId="availability-checkbox"
              multiple
              input={<OutlinedInput label="Availability" />}
              value={availabilityFilter}
              onChange={(e) =>
                setAvailabilityFilter(e.target.value as string[])
              }
              renderValue={(selected) => selected.join(", ")}
            >
              {weekdays.map((day) => (
                <MenuItem key={day} value={day}>
                  <Checkbox checked={availabilityFilter.indexOf(day) > -1} />
                  <ListItemText primary={day} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Mode Filter */}
          <FormControl
            size="small"
            sx={{
              width: {
                xs: "100%",
                md: "200px",
              },
            }}
          >
            <InputLabel id="mode-checkbox">Mode</InputLabel>
            <Select
              labelId="mode-checkbox"
              multiple
              input={<OutlinedInput label="Mode" />}
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value as string[])}
              renderValue={(selected) => selected.join(", ")}
            >
              {modes.slice(0, 2).map((mode) => (
                <MenuItem key={mode} value={mode}>
                  <Checkbox checked={modeFilter.indexOf(mode) > -1} />
                  <ListItemText primary={mode} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" onClick={handleSearch}>
            Filter
          </Button>
          <Button variant="contained" color="secondary" onClick={clearFilters}>
            Clear
          </Button>
        </Box>

        {subjectsList.length === 0 ? (
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            No subjects found
          </Typography>
        ) : (
          <Grid container spacing={2} sx={{}}>
            {subjectsList.map((subject) => (
              <Grid key={subject._id} item xs={12} sm={6} lg={4}>
                <Card
                  sx={{
                    mt: 2,
                    borderRadius: 3,
                    boxShadow: 3,

                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.01)",
                    },
                  }}
                >
          
                  <CardHeader
                    title={subject.title}
                    subheader={
                      subject.averageRating !== undefined ? (
                        <Rating
                          name="read-only"
                          value={parseFloat(subject.averageRating.toFixed(1))}
                          precision={0.5}
                          readOnly
                          sx={{ fontSize: 20 }}
                        />
                      ) : (
                        <Rating
                          name="read-only"
                          value={0}
                          precision={0.5}
                          readOnly
                          sx={{ fontSize: 20 }}
                        />
                      )
                    }
                    action={
                      <Tooltip title="View more">
                      <IconButton aria-label="settings" onClick={() => setSelectedSubject(subject)}>
                        <MoreVertIcon />
                      </IconButton>
                      </Tooltip>
                    }
                    sx={{
                      borderBottom: `2px solid ${darkblue[200]}`,
                    }}
                  />
                  <CardMedia
                    component="img"
                    alt="subject image"
                    height="140"
                    image={subject.coverImage}
                  />
                  <CardContent sx={{ p: 2, pb: 2 }}>
                    <Typography variant="body1" >{subject.tutorName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {subject.description}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body1">{subject.mode}</Typography>
                    <Typography variant="body1" color={"#1976d2"}>
                      {subject.availability.join(" | ")}
                    </Typography>
                    <Box py={1}>
                      {subject.medium.map((medium) => (
                        <Chip key={medium} label={medium} sx={{ mr: 0.5 }} />
                      ))}
                    </Box>
                  </CardContent>
                  <Box display={"flex"} justifyContent={"flex-end"}>
                    <CardActions>
                      
                      <Button
                        onClick={() => {
                          setIsRequestAlertOpen(true);
                          setSubjectId(subject._id);
                          setTutorId(subject.tutorId);
                        }}
                      >
                        Request
                      </Button>
                    </CardActions>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <AlertBox
        open={isRequestAlertOpen}
        title="Subject Request"
        message="Are you sure you want to request this subject?"
        onClose={() => {
          setIsRequestAlertOpen(false);
          setSubjectId(null);
          setTutorId(null);
        }}
        onAgree={handleRequest}
      />
      <PopupModal
        open={!!selectedSubject}
        onClose={() => setSelectedSubject(null)}
        maxWidth="md"
      >
        <SubjectModal selectedSubject={selectedSubject!} />
      </PopupModal>
    </>
  );
};

export default SearchSt;
