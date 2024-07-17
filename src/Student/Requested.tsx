// import React, { useEffect, useState } from "react";
// import { Box, Grid, Typography } from "@mui/material";
// import TutorCard from "./TutorCard";
// import axios from "axios";
// import { RequestResponse, SubjectRequest } from "../data/interfaces";
// import { toast } from "react-toastify";

// interface CardState {
//   id: number;
//   visible: boolean;
// }

// export default function Requested() {
//   const [requestedSubjects, setRequestedSubjects] = useState<SubjectRequest[]>(
//     []
//   );
//   const [isFetching, setIsFetching] = useState<boolean>(true);
//   const fetchRequestedSubjects = async () => {
//     try {
//       setIsFetching(true);
//       const studentId =localStorage.getItem("userId");
//       const response = await axios.get(
//         `http://localhost:5025/api/Request/student/${studentId}/reject/pending`
//       );
//       setRequestedSubjects(response.data);
//       setIsFetching(false);
//     } catch (error) {
//       toast.error("Something went wrong");
//       setIsFetching(false);
//     }
//   };

//   useEffect(() => {
//     fetchRequestedSubjects();
//   }, []);

//   if (isFetching)
//     return (
//       <Box>
//         <Typography variant="h6" color="textSecondary" align="center">
//           Loading...
//         </Typography>
//       </Box>
//     );
//   return (
//     <Box sx={{ p: 2 }}>
//       {requestedSubjects.length === 0 ? (
//         <Typography variant="h4" color="textSecondary" align="center">
//           No subject requests yet
//         </Typography>
//       ) : (
//         <Grid container spacing={2}>
//           {requestedSubjects.map((request) => (
//             <Grid item sm={4} key={request._id}>
//               <TutorCard request={request} onCancel={() => {}} />
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// }


import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TutorCard from "./TutorCard";
import axios from "axios";
import { RequestResponse, SubjectRequest } from "../data/interfaces";
import { toast } from "react-toastify";

interface CardState {
  id: number;
  visible: boolean;
}

export default function Requested() {
  const [requestedSubjects, setRequestedSubjects] = useState<SubjectRequest[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<SubjectRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const fetchRequestedSubjects = async () => {
    try {
      setIsFetching(true);
      const studentId = localStorage.getItem("userId");
      const response = await axios.get(
        `http://localhost:5025/api/Request/student/${studentId}/reject/pending`
      );
      setRequestedSubjects(response.data);
      setFilteredSubjects(response.data);
      setIsFetching(false);
    } catch (error) {
      toast.error("Something went wrong");
      setIsFetching(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = requestedSubjects.filter(
      (subject) =>
        subject.status.toLowerCase().includes(query)
    );
    setFilteredSubjects(filtered);
  };

  useEffect(() => {
    fetchRequestedSubjects();
  }, []);

  if (isFetching)
    return (
      <Box>
        <Typography variant="h6" color="textSecondary" align="center">
          Loading...
        </Typography>
      </Box>
    );

  return (
    <Box sx={{ p: 2 }}>
      <Box mb={2}>
        <TextField
          variant="outlined"
          placeholder="Search by status..."
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {filteredSubjects.length === 0 ? (
        <Typography variant="h4" color="textSecondary" align="center">
          No subject requests yet
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredSubjects.map((request) => (
            <Grid item sm={4} key={request._id}>
              <TutorCard request={request} onCancel={() => {}} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
