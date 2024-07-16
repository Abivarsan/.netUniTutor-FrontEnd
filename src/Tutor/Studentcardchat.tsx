// import React from "react";
// import {
//   Avatar,
//   Box,
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   CardHeader,
//   CardMedia,
//   Typography,
//   IconButton,
//   Modal,
//   TextField,
//   Tooltip,
// } from "@mui/material";
// import AccountBoxIcon from "@mui/icons-material/AccountBox";
// import LocalActivityIcon from "@mui/icons-material/LocalActivity";
// import SmsIcon from "@mui/icons-material/Sms";
// import { toast } from "react-toastify";
// import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

// const darkblue = {
//   100: "#C9DCF7",
//   200: "#789CFF",
//   400: "#3A66FF",
//   500: "#0044FF",
//   600: "#0037CC",
//   900: "#001B80",
// };

// export default function Studentcardchat() {
//   const [comment, setComment] = React.useState("");
//   const [open, setOpen] = React.useState(false);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const handleSubmit = () => {
//     if (comment.trim() === "") {
//       toast.error("Comment is required");
//       return;
//     }
//     console.log("Submitted:", { comment });
//     toast.success("Submitted successfully");
//     setComment("");
//     handleClose();
//   };

//   return (
//     <Box height={300} width={600}>
//       <Card
//         sx={{
//           borderRadius: 3,
//           boxShadow: 3,
//           width: 300,
//           transition: "transform 0.3s ease-in-out",
//           "&:hover": {
//             transform: "scale(1.05)",
//           },
//         }}
//       >
//         <Box position="relative">
//           <CardHeader
//             avatar={
//               <Avatar sx={{ bgcolor: darkblue[500] }}>
//                 <AccountBoxIcon fontSize="large" />
//               </Avatar>
//             }
//             title="Nilaxsan"
//             subheader="Grade 11"
//             sx={{
//               bgcolor: darkblue[100],
//               borderBottom: `1px solid ${darkblue[200]}`,
//             }}
//           />
//           <Tooltip title="Report">
//             <IconButton
//               aria-label="Report"
//               sx={{
//                 position: "absolute",
//                 top: 8,
//                 right: 8,
//                 color: darkblue[600],
//               }}
//               onClick={handleOpen}
//             >
//               <ReportGmailerrorredIcon fontSize="medium" color="error" />
//             </IconButton>
//           </Tooltip>
//         </Box>
//         <CardContent>
//           <Typography variant="body2" color="text.secondary">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
//             ex eveniet alias aliquid sequi mollitia autem suscipit, asperiores,
//             explicabo accusantium dolorum.
//           </Typography>
//         </CardContent>
//         <Box display="flex" justifyContent="flex-end">
//           <CardActions>
//             <Tooltip title="Chat">
//               <IconButton aria-label="Chat" sx={{ color: darkblue[600] }}>
//                 <SmsIcon fontSize="medium" />
//               </IconButton>
//             </Tooltip>
//           </CardActions>
//         </Box>
//       </Card>

//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//         BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.5)" } }}
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 700,
//             height: 450,
//             bgcolor: "background.paper",
//             border: "none",
//             boxShadow: 24,
//             borderRadius: 4,
//             p: 4,
//           }}
//         >
//           <Typography
//             id="modal-modal-title"
//             variant="h6"
//             component="h6"
//             align="center"
//             sx={{ color: darkblue[900], fontSize: "40px" }}
//           >
//             Report Student
//           </Typography>

//           <Box
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             justifyContent="center"
//             height="auto"
//             sx={{ mt: 3 }}
//           >
//             <TextField
//               id="outlined"
//               label="Report here..."
//               multiline
//               rows={3}
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               sx={{
//                 width: "100%",
//                 mt: 3,
//                 "& .MuiOutlinedInput-root": {
//                   fontSize: "20px",
//                   "& fieldset": {
//                     borderColor: darkblue[500],
//                   },
//                   "&:hover fieldset": {
//                     borderColor: darkblue[600],
//                   },
//                   "&.Mui-focused fieldset": {
//                     borderColor: darkblue[900],
//                   },
//                 },
//                 "& .MuiInputLabel-root": {
//                   fontSize: "20px",
//                   color: darkblue[500],
//                 },
//                 "& .MuiInputLabel-root.Mui-focused": {
//                   color: darkblue[900],
//                 },
//               }}
//             />
//             <Button
//               variant="outlined"
//               size="large"
//               sx={{ mt: 5, color: "darkblue", borderColor: darkblue[500] }}
//               onClick={handleSubmit}
//             >
//               Submit
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </Box>
//   );
// }

import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Tutor from "./Tutor.jpg";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SmsIcon from "@mui/icons-material/Sms";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import ReportModal from "./ReportModal";
import { TutorAccept } from "../data/interfaces";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";

const darkblue = {
  100: "#C9DCF7",
  200: "#789CFF",
  400: "#3A66FF",
  500: "#0044FF",
  600: "#0037CC",
  900: "#001B80",
};

interface StudentCardChatProps {
  accept: TutorAccept;

}

const StudentCardChat: React.FC<StudentCardChatProps> = ({ accept }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();


  return (
    <Box height={300} width={600}>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          width: 400,
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <Box position="relative">
          <CardHeader
            avatar={
             accept.studentId.profileUrl ? <Avatar src={accept.studentId.profileUrl} /> : <Avatar sx={{ bgcolor: darkblue[500] }}>
                <AccountBoxIcon fontSize="large" />
              </Avatar>
            }
            title={accept.studentId.firstName + " " + accept.studentId.lastName}
            titleTypographyProps={{
              fontWeight: 'bold',
              fontSize: 20,
            }}
            subheader={accept.studentId.grade}
            sx={{
              bgcolor: darkblue[100],
              borderBottom: `1px solid ${darkblue[200]}`,
            }}
          />
          <Tooltip title="Report">
            <IconButton
              aria-label="Report"
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: darkblue[600],
              }}
              onClick={handleOpen}
            >
              <ReportGmailerrorredIcon fontSize="medium" color="error" />
            </IconButton>
          </Tooltip>
        </Box>
        <CardContent>
          <Box display="flex" alignItems="center" mt={0.5}>
            < LibraryBooksIcon sx={{ fontSize: 25, color: "darkblue" }} />
            <Typography variant="body1" sx={{ marginLeft: 1, color: "darkblue" }}>
              {accept.subjectId.title}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={0.5}>
            <LocationOnIcon sx={{ fontSize: 22, color: "darkblue" }} />
            <Typography variant="body1" sx={{ marginLeft: 1, color: "darkblue" }}>
              {accept.studentId.district}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={0.5}>
            <CallIcon sx={{ fontSize: 20, color: "darkblue" }} />
            <Typography variant="body1" sx={{ marginLeft: 1, color: "darkblue" }}>
              {accept.studentId.phoneNumber}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={0.5}>
            <EmailIcon sx={{ fontSize: 20, color: "darkblue" }} />
            <Typography variant="body1" sx={{ marginLeft: 1, color: "darkblue" }}>
              {accept.studentId.email}
            </Typography>
          </Box>

          {/* <Typography variant="body1" color="text.primary" mt={3}>
            {accept.subjectId.description}
          </Typography> */}


        </CardContent>
        <Box display="flex" justifyContent="flex-end">
          <CardActions>
            <Tooltip title="Chat">
              <IconButton aria-label="Chat" sx={{ color: darkblue[600] }} onClick={() => navigate("/chat")} >
                <SmsIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Box>
      </Card>

      <ReportModal open={open} reportedId={accept.studentId._id} onClose={handleClose} />
    </Box>
  );
};

export default StudentCardChat;
