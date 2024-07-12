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
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   IconButton
// } from "@mui/material";
// import CollectionsIcon from '@mui/icons-material/Collections';
// import CustomAvatar from "../../Components/Avatar/CustomAvatar";
// import CameraAltIcon from '@mui/icons-material/CameraAlt';

// type Person = {
//   id: number;
//   profileUrl: string;
//   firstName: string;
//   lastName: string;
//   createdAt: string;
//   address: string;
//   district: string;
//   phoneNumber: string;
//   // Student specific
//   email?: string;
//   grade?: string;
//   schoolName?: string;
//   numberofcomplain?: number;
//   // Tutor specific
//   occupation?: string;
//   universityMail?: string;
//   qualifications?: string | string[];
//   cv?: string;
//   universityID?: string;
// };

// type SinglePersonProps = {
//   apiEndpoint: string;
//   personType: "student" | "tutor";
// };

// const Single: React.FC<SinglePersonProps> = ({ apiEndpoint, personType }) => {
//   const { id } = useParams<{ id: string }>();
//   const [person, setPerson] = useState<Person | null>(null);
//   const [openCv, setOpenCv] = useState(false);
//   const [openUniversityId, setOpenUniversityId] = useState(false);

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

//   const handleCvOpen = () => setOpenCv(true);
//   const handleCvClose = () => setOpenCv(false);

//   const handleUniversityIdOpen = () => setOpenUniversityId(true);
//   const handleUniversityIdClose = () => setOpenUniversityId(false);

//   const renderQualifications = (qualifications: string | string[] | undefined) => {
//     if (Array.isArray(qualifications)) {
//       return qualifications.join(", ");
//     } else if (typeof qualifications === "string") {
//       return qualifications;
//     }
//     return "N/A";
//   };

//   return (
//     <Container maxWidth="sm">
//       <Card>
//         <CardHeader
//           avatar={<CustomAvatar
//             name={`${person.firstName || ""} ${person.lastName || ""}`}
//             src={person.profileUrl} />}
//           title={`${person.firstName} ${person.lastName}`}
//           subheader={person.grade || person.occupation || "N/A"}
//         />
//         <CardContent>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <Typography variant="h6">Information</Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="body2" color="textSecondary">Email:</Typography>
//               <Typography variant="body1">{person.email || person.universityMail}</Typography>
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
//             {personType === "student" && (
//               <>
//                 <Grid item xs={6}>
//                   <Typography variant="body2" color="textSecondary">School:</Typography>
//                   <Typography variant="body1">{person.schoolName || "N/A"}</Typography>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography variant="body2" color="textSecondary">Number of Complaints:</Typography>
//                   <Typography variant="body1">{person.numberofcomplain}</Typography>
//                 </Grid>
//               </>
//             )}
//             {personType === "tutor" && (
//               <>
//                 <Grid item xs={6}>
//                   <Typography variant="body2" color="textSecondary">University ID:</Typography>
//                   {/* <Button variant="contained" onClick={handleUniversityIdOpen}>
//                     View
//                   </Button> */}
//                   <IconButton onClick={handleCvOpen} color="primary" size="large">
//                         <CameraAltIcon />
//                         </IconButton>
//                   <Dialog open={openUniversityId} onClose={handleUniversityIdClose}>
//                     <DialogTitle>
//                       University ID
//                       <IconButton
//                         aria-label="close"
//                         onClick={handleUniversityIdClose}
//                         sx={{
//                           position: 'absolute',
//                           right: 100,
//                           top: 100,
//                         }}
//                       >
//                       </IconButton>
//                     </DialogTitle>
//                     <DialogContent>
//                       <DialogContentText>
//                         <img src={person.universityID} alt="University ID" style={{ width: "100%" }} />
//                       </DialogContentText>
//                     </DialogContent>
//                     <DialogActions>
//                       <Button onClick={handleUniversityIdClose}>Close</Button>
//                     </DialogActions>
//                   </Dialog>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography variant="body2" color="textSecondary">Qualifications:</Typography>
//                   <Typography variant="body1">{renderQualifications(person.qualifications)}</Typography>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography variant="body2" color="textSecondary">CV:</Typography>
//                         <IconButton onClick={handleCvOpen} color="primary" size="large">
//                         <CollectionsIcon />
//                         </IconButton>
//                   {/* <Button variant="contained" onClick={handleCvOpen}>
//                     View
//                   </Button> */}
//                   <Dialog open={openCv} onClose={handleCvClose}>
//                     <DialogTitle>
//                       CV
//                       <IconButton
//                         aria-label="close"
//                         onClick={handleCvClose}
//                         sx={{
//                           position: 'absolute',
//                           right: 100,
//                           top: 100,
//                         }}
//                       >
//                       </IconButton>
//                     </DialogTitle>
//                     <DialogContent>
//                       <DialogContentText>
//                         <img src={person.cv} alt="CV" style={{ width: "100%" }} />
//                       </DialogContentText>
//                     </DialogContent>
//                     <DialogActions>
//                       <Button onClick={handleCvClose}>Close</Button>
//                     </DialogActions>
//                   </Dialog>
//                 </Grid>
//               </>
//             )}
//             <Grid item xs={12}>
//               <Typography variant="body2" color="textSecondary">Created At:</Typography>
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
  IconButton,
  TextField
} from "@mui/material";
import CollectionsIcon from '@mui/icons-material/Collections';
import CustomAvatar from "../../Components/Avatar/CustomAvatar";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';

type Person = {
  id: number;
  profileUrl: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  address: string;
  district: string;
  phoneNumber: string;
  email?: string;
  grade?: string;
  schoolName?: string;
  numberofcomplain?: number;
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ username: '', password: '' });
  const [emailMessage, setEmailMessage] = useState('');

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

  const handleDeleteClick = () => setDeleteDialogOpen(true);
  const handleDeleteConfirm = () => {
    setDeleteDialogOpen(false);
    setLoginDialogOpen(true);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5025/api/Admin/relogin', adminCredentials);
      if (response.data.success) {
        setLoginDialogOpen(false);
        setEmailDialogOpen(true);
      } else {
        alert('Invalid login credentials');
      }
    } catch (error) {
      console.error("Error during admin login:", error);
    }
  };

  const handleSendEmail = async () => {
    try {
      await axios.post('http://localhost:5025/api/Admin/Report/send-email', {
        to: person.email || person.universityMail,
        message: emailMessage
      }); 
      await axios.delete(`${apiEndpoint}/${id}`);
      setEmailDialogOpen(false);
      alert('Profile deleted and email sent successfully');
    } catch (error) {
      console.error("Error deleting profile or sending email:", error);
    }
  };

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
          avatar={<CustomAvatar name={`${person.firstName || ""} ${person.lastName || ""}`} src={person.profileUrl} />}
          title={`${person.firstName} ${person.lastName}`}
          subheader={person.grade || person.occupation || "N/A"}
          action={
            <Button variant="contained" color="secondary" onClick={handleDeleteClick}>
              Remove
            </Button>
          }
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
                  <IconButton onClick={handleUniversityIdOpen} color="primary" size="large">
                    <CameraAltIcon />
                  </IconButton>
                  <Dialog open={openUniversityId} onClose={handleUniversityIdClose}>
                    <DialogTitle>
                      University ID
                      <IconButton aria-label="close" onClick={handleUniversityIdClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <CameraAltIcon />
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
                  <IconButton onClick={handleCvOpen} color="primary" size="large">
                    <CollectionsIcon />
                  </IconButton>
                  <Dialog open={openCv} onClose={handleCvClose}>
                    <DialogTitle>
                      CV
                      <IconButton aria-label="close" onClick={handleCvClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <CollectionsIcon />
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this profile? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="secondary">Yes, Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Admin Login Dialog */}
      <Dialog open={loginDialogOpen} onClose={() => setLoginDialogOpen(false)}>
        <DialogTitle>Admin Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your admin credentials to confirm the deletion.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            value={adminCredentials.username}
            onChange={(e) => setAdminCredentials({ ...adminCredentials, username: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={adminCredentials.password}
            onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoginDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleLogin} color="primary">Login</Button>
        </DialogActions>
      </Dialog>

      {/* Email Message Dialog */}
      <Dialog open={emailDialogOpen} onClose={() => setEmailDialogOpen(false)}>
        <DialogTitle>Send Email</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please type the message to be sent to the owner of the profile.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email Message"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={4}
            value={emailMessage}
            onChange={(e) => setEmailMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmailDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSendEmail} color="primary">Send Email and Delete Profile</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Single;
