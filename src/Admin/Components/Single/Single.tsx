// import React from "react";
// import {
//   Legend,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import "./Single.scss";

// type DataKey = {
//   name: string;
//   color: string;
// };

// type ChartData = {
//   dataKeys: DataKey[];
//   data: any[]; // Adjust as per your actual data structure
// };

// type Activity = {
//   time: string;
//   text: string;
// };

// type Props = {
//   id: number;
//   ProfileUrl?: string;
//   title: string;
//   info: Record<string, any>; // Adjust as per your actual data structure
//   chart?: ChartData;
//   activities?: Activity[];
// };

// const Single: React.FC<Props> = ({ id, ProfileUrl, title, info, chart, activities }) => {
//   return (
//     <div className="single">
//       <div className="view">
//         <div className="info">
//           <div className="topInfo">
//             {ProfileUrl && <img src={ProfileUrl} alt="" />}
//             <h1>{title}</h1>
//             <button>Remove</button>
//           </div>
//           <div className="details">
//             {Object.entries(info).map(([key, value]) => (
//               <div className="item" key={key}>
//                 <span className="itemTitle">{key}:-</span>
//                 <span className="itemValue">{value}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//         <hr />
//         {chart && (
//           <div className="chart">
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart
//                 width={500}
//                 height={300}
//                 data={chart.data}
//                 margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//               >
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 {chart.dataKeys.map((dataKey, index) => (
//                   <Line
//                     key={index}
//                     type="monotone"
//                     dataKey={dataKey.name}
//                     stroke={dataKey.color}
//                   />
//                 ))}
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         )}
//       </div>
//       <div className="activities">
//         <h2>Latest Activities</h2>
//         {activities && (
//           <ul>
//             {activities.map((activity, index) => (
//               <li key={index}>
//                 <div>
//                   <p>{activity.text}</p>
//                   <time>{activity.time}</time>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Single;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import {
//   Avatar,
//   Card,
//   CardContent,
//   CardHeader,
//   CircularProgress,
//   Container,
//   Grid,
//   Typography,
// } from "@mui/material";

// type Person = {
//   id: number;
//   profileUrl: string;
//   firstName: string;
//   lastName: string;
//   createdAt: string;
//   numberofcomplain: number;
//   email: string;
//   grade?: string;
//   schoolName?: string;
//   address: string;
//   district: string;
//   phoneNumber: string;
// };

// type SinglePersonProps = {
//   apiEndpoint: string;
// };

// const Single: React.FC<SinglePersonProps> = ({ apiEndpoint }) => {
//   const { id } = useParams<{ id: string }>();
//   const [person, setPerson] = useState<Person | null>(null);

//   useEffect(() => {
//     const fetchPerson = async () => {
//       try {
//         const response = await axios.get<Person>(`${apiEndpoint}/${id}`);
//         setPerson(response.data);
//       } catch (error) {
//         console.error("Error fetching person:", error);
//       }
//     };

//     fetchPerson();
//   }, [apiEndpoint, id]);

//   if (!person) {
//     return <CircularProgress />;
//   }

//   return (
//     <Container maxWidth="sm">
//       <Card>
//         <CardHeader
//           avatar={<Avatar src={person.profileUrl} />}
//           title={`${person.firstName} ${person.lastName}`}
//           subheader={person.grade || "N/A"}
//         />
//         <CardContent>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <Typography variant="h6">Information</Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="body2" color="textSecondary">Email:</Typography>
//               <Typography variant="body1">{person.email}</Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="body2" color="textSecondary">Phone Number:</Typography>
//               <Typography variant="body1">{person.phoneNumber}</Typography>
//             </Grid>
//             <Grid item xs={12}>
//               <Typography variant="body2" color="textSecondary">Address:</Typography>
//               <Typography variant="body1">{person.address}</Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="body2" color="textSecondary">District:</Typography>
//               <Typography variant="body1">{person.district}</Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="body2" color="textSecondary">School:</Typography>
//               <Typography variant="body1">{person.schoolName || "N/A"}</Typography>
//             </Grid>
//             <Grid item xs={12}>
//               <Typography variant="body2" color="textSecondary">Number of Complaints:</Typography>
//               <Typography variant="body1">{person.numberofcomplain}</Typography>
//             </Grid>
//             <Grid item xs={12}>
//               <Typography variant="body2" color="textSecondary"> Created At:</Typography>
//               <Typography variant="body1">{person.createdAt}</Typography>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default Single;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CustomAvatar from "../../Components/Avatar/CustomAvatar";

type Person = {
  id: number;
  profileUrl: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  address: string;
  district: string;
  phoneNumber: string;
  // Student specific
  email?: string;
  grade?: string;
  schoolName?: string;
  numberofcomplain?: number;
  // Tutor specific
  occupation?: string;
  universityMail?: string;
  qualifications?: string | string[];
  cv?: string;
  universityID?: string;
};

type SinglePersonProps = {
  apiEndpoint: string;
  personType: "student" | "tutor";
};

const Single: React.FC<SinglePersonProps> = ({ apiEndpoint, personType }) => {
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<Person | null>(null);
  const [openCv, setOpenCv] = useState(false);
  const [openUniversityId, setOpenUniversityId] = useState(false);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const response = await axios.get<Person>(`${apiEndpoint}/${id}`);
        setPerson(response.data);
      } catch (error) {
        console.error("Error fetching person:", error);
      }
    };

    fetchPerson();
  }, [apiEndpoint, id]);

  if (!person) {
    return <CircularProgress />;
  }

  const handleCvOpen = () => setOpenCv(true);
  const handleCvClose = () => setOpenCv(false);

  const handleUniversityIdOpen = () => setOpenUniversityId(true);
  const handleUniversityIdClose = () => setOpenUniversityId(false);

  const renderQualifications = (qualifications: string | string[] | undefined) => {
    if (Array.isArray(qualifications)) {
      return qualifications.join(", ");
    } else if (typeof qualifications === "string") {
      return qualifications;
    }
    return "N/A";
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardHeader
          avatar={<CustomAvatar
            name={`${person.firstName || ""} ${person.lastName || ""}`}
            src={person.profileUrl} />}
          title={`${person.firstName} ${person.lastName}`}
          subheader={person.grade || person.occupation || "N/A"}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Information</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">Email:</Typography>
              <Typography variant="body1">{person.email || person.universityMail}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">Phone Number:</Typography>
              <Typography variant="body1">{person.phoneNumber}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">Address:</Typography>
              <Typography variant="body1">{person.address}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">District:</Typography>
              <Typography variant="body1">{person.district}</Typography>
            </Grid>
            {personType === "student" && (
              <>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">School:</Typography>
                  <Typography variant="body1">{person.schoolName || "N/A"}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="textSecondary">Number of Complaints:</Typography>
                  <Typography variant="body1">{person.numberofcomplain}</Typography>
                </Grid>
              </>
            )}
            {personType === "tutor" && (
              <>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">University ID:</Typography>
                  <Button variant="contained" onClick={handleUniversityIdOpen}>
                    View
                  </Button>
                  <Dialog open={openUniversityId} onClose={handleUniversityIdClose}>
                    <DialogTitle>
                      University ID
                      <IconButton
                        aria-label="close"
                        onClick={handleUniversityIdClose}
                        sx={{
                          position: 'absolute',
                          right: 100,
                          top: 100,
                        }}
                      >
                      </IconButton>
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        <img src={person.universityID} alt="University ID" style={{ width: "100%" }} />
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleUniversityIdClose}>Close</Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="textSecondary">Qualifications:</Typography>
                  <Typography variant="body1">{renderQualifications(person.qualifications)}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="textSecondary">CV:</Typography>
                  <Button variant="contained" onClick={handleCvOpen}>
                    View
                  </Button>
                  <Dialog open={openCv} onClose={handleCvClose}>
                    <DialogTitle>
                      CV
                      <IconButton
                        aria-label="close"
                        onClick={handleCvClose}
                        sx={{
                          position: 'absolute',
                          right: 100,
                          top: 100,
                        }}
                      >
                      </IconButton>
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        <img src={person.cv} alt="CV" style={{ width: "100%" }} />
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCvClose}>Close</Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">Created At:</Typography>
              <Typography variant="body1">{person.createdAt}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Single;
