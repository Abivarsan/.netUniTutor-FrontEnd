// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
// import AccountBoxIcon from "@mui/icons-material/AccountBox";
// import SmsIcon from "@mui/icons-material/Sms";
// import LocalActivityIcon from "@mui/icons-material/LocalActivity";
// import {
//   Box,
//   CardHeader,
//   IconButton,
//   Rating,
//   Modal,
//   TextField,
//   Button,
//   Avatar,
//   Tooltip,
// } from "@mui/material";
// import React, { useState } from "react";
// import { toast } from "react-toastify";

// const darkblue = {
//   100: "#C9DCF7",
//   200: "#789CFF",
//   400: "#3A66FF",
//   500: "#0044FF",
//   600: "#0037CC",
//   900: "#001B80",
// };

// export default function Tutorcardchat({ initialRating = 3 }) {
//   const [value, setValue] = useState<number | null>(0);
//   const [comment, setComment] = useState("");
//   const [report, setReport] = useState("");
//   const [openModal, setOpenModal] = useState(false);
//   const [reviewMode, setReviewMode] = useState<"review" | "report">("review");

//   const handleOpenModal = () => setOpenModal(true);
//   const handleCloseModal = () => setOpenModal(false);

//   const handleReview = () => {
//     setReviewMode("review");
//     handleOpenModal();
//   };

//   const handleReport = () => {
//     setReviewMode("report");
//     handleOpenModal();
//   };

//   const handleSubmit = () => {
//     if (comment.trim() === "") {
//       toast.error("Comment is required");
//       return;
//     }

//     console.log("Submitted:", { comment, rating: value });

//     toast.success("Submitted successfully");
//     setComment("");
//     setValue(initialRating);
//     handleCloseModal();
//   };

//  const handleReportsubmit = () => {
//     if (report.trim() === "") {
//       toast.error("Report is required");
//       return; 
//     }

//     console.log("Submitted:", { report });

//     toast.success("Reported successfully");
//     setReport("");
//     handleCloseModal();
//   }

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
//         <CardHeader
//           avatar={
//             <Avatar sx={{ bgcolor: darkblue[500] }}>
//               <AccountBoxIcon fontSize="large" />
//             </Avatar>
//           }
//           title="Menushaa"
//           subheader={
//             <Rating
//               name="read-only"
//               value={initialRating}
//               readOnly
//               sx={{
//                 fontSize: 20,
//               }}
//             />
//           }
//           sx={{
//             bgcolor: darkblue[100],
//             borderBottom: `1px solid ${darkblue[200]}`,
//           }}
//         />
//         <CardContent>
//           <Typography variant="body2" color="text.secondary">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
//             ex eveniet alias aliquid sequi mollitia autem suscipit, asperiores,
//             explicabo accusantium dolorum.
//           </Typography>
//         </CardContent>
//         <Box display={"flex"} justifyContent={"flex-end"}>
//           <CardActions>
//             <Tooltip title="Review Rating & Report" arrow>
//               <IconButton
//                 aria-label="Rating"
//                 sx={{ color: "darkblue" }}
//                 onClick={handleReview}
//               >
//                 <LocalActivityIcon fontSize="medium" />
//               </IconButton>
//             </Tooltip>

//             <Tooltip title="Chat" arrow>
//               <IconButton aria-label="Chat" sx={{ color: "darkblue" }}>
//                 <SmsIcon fontSize="medium" />
//               </IconButton>
//             </Tooltip>
//           </CardActions>
//         </Box>
//       </Card>

//       {/* Review and Report Modal */}
//       <Modal
//         open={openModal}
//         onClose={handleCloseModal}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//         BackdropProps={{
//           style: { backgroundColor: "transparent" },
//         }}
//       >
//         {/* Modal Content Based on reviewMode */}
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 700,
//             height: 450,
//             bgcolor: "background.paper",
//             border: "2px solid #000",
//             boxShadow: 24,
//             borderRadius: 4,
//             p: 4,
//           }}
//         >
//           {/* Ask whether user wants to review or report */}
//           <Typography
//             id="modal-modal-title"
//             variant="h6"
//             component="h6"
//             align="center"
//             sx={{ color: "darkblue", fontSize: "24px", mb: 3 }}
//           >
//             {reviewMode === "review" ? "Review and Rating" : "Report Tutor"}
//           </Typography>

//           {/* Buttons for Review and Report */}
//           <Box
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             mb={3}
//           >
//             <Button 
//               color= "success"
//               variant={reviewMode === "review" ? "contained" : "outlined"}
//               onClick={() => setReviewMode("review")}
//             >
//               Review
//             </Button>
//             <Button
//                color="error"
//               variant={reviewMode === "report" ? "contained" : "outlined"}
//               onClick={() => setReviewMode("report")}
//               sx={{ ml: 2 }}
//             >
//               Report
//             </Button>
//           </Box>

//           {/* Content based on selected mode */}
//           {reviewMode === "review" && (
//             <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
//               <Rating
//                 name="simple-controlled"
//                 value={value}
//                 onChange={(event, newValue) => {
//                   setValue(newValue);
//                 }}
//                 sx={{ fontSize: "50px", mb: 3 }}
//               />

//               <TextField
//                 id="outlined"
//                 label="Add Comment here..."
//                 multiline
//                 rows={3}
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 fullWidth
//                 variant="outlined"
//                 sx={{ mb: 3 }}
//               />

//               <Button
//                 variant="contained"
//                 size="medium"
//                 onClick={handleSubmit}
//               >
//                 Submit
//               </Button>
//               </Box>
//           )}

//           {reviewMode === "report" && (
//             <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
//                <TextField
//                 id="outlined"
//                 label="Report here..."
//                 multiline
//                 rows={3}
//                 value={report}
//                 onChange={(e) => setReport(e.target.value)}
//                 fullWidth
//                 variant="outlined"
//                 sx={{ mt: 3 }}
//               />

//               {/* Example Close Button */}
//               <Button
//                 color="primary"
//                 variant="contained"
//                 size="medium"
//                 sx={{ mt: 6 }}
//                 onClick={handleReportsubmit}
//               >
//                 Submit
//               </Button>
//             </Box>
//           )}
//         </Box>
//       </Modal>
//     </Box>
//   );
// }
import axios from 'axios';
import React, { useState } from "react";
import { Box, Card, CardActions, CardContent, CardHeader, IconButton, Rating, Modal, Avatar, Tooltip, Button, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SmsIcon from "@mui/icons-material/Sms";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { toast } from "react-toastify";
import ReviewSection from "../components/Reviewsection";
import ReportSection from "../components/ReportSection";
import { request } from "http";
import { SubjectRequest } from "../data/interfaces";
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";

const darkblue = {
  100: "#C9DCF7",
  200: "#789CFF",
  400: "#3A66FF",
  500: "#0044FF",
  600: "#0037CC",
  900: "#001B80",
};

interface TutorCardchatProps {
  request: SubjectRequest;

}

const Tutorcardchat: React.FC<TutorCardchatProps> = ({ request }) => {
  const [openModal, setOpenModal] = useState(false);
  const [reviewMode, setReviewMode] = useState<"review" | "report">("review");

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleReview = () => {
    setReviewMode("review");
    handleOpenModal();
  };

  const handleReport = () => {
    setReviewMode("report");
    handleOpenModal();
  };






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
        <CardHeader
          avatar={
            request.tutorId.profileUrl ? <Avatar src={request.tutorId.profileUrl} /> : <Avatar sx={{ bgcolor: darkblue[500] }}>
               <AccountBoxIcon fontSize="large" />
             </Avatar>
           }
          title={request.subjectId.title}
          titleTypographyProps={{
            fontWeight: 'bold',
            fontSize: 20,
          }}
          subheader={
            <Rating
              name="read-only"
              // value={request.tutorId.rating}
              readOnly
              sx={{
                fontSize: 20,
              }}
            />
          }
          sx={{
            bgcolor: darkblue[100],
            borderBottom: `1px solid ${darkblue[200]}`,
          }}
        />

        <CardContent>
          <Box display="flex" alignItems="center" mt={0.5}>
            < PersonIcon sx={{ fontSize: 25, color: "darkblue" }} />
            <Typography variant="body1" sx={{ marginLeft: 1, color: "darkblue" }}>
              {request.tutorId.firstName + " " + request.tutorId.lastName}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={0.5}>
            <LocationOnIcon sx={{ fontSize: 22, color: "darkblue" }} />
            <Typography variant="body1" sx={{ marginLeft: 1, color: "darkblue" }}>
              {request.tutorId.district}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={0.5}>
            <CallIcon sx={{ fontSize: 20, color: "darkblue" }} />
            <Typography variant="body1" sx={{ marginLeft: 1, color: "darkblue" }}>
              {request.tutorId.phoneNumber}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={0.5}>
            <EmailIcon sx={{ fontSize: 20, color: "darkblue" }} />
            <Typography variant="body1" sx={{ marginLeft: 1, color: "darkblue" }}>
              {request.tutorId.universityMail}
            </Typography>
          </Box>

          <Typography variant="body1" color="text.primary" mt={3}>
            {request.subjectId.description}
          </Typography>


        </CardContent>
        <Box display={"flex"} justifyContent={"flex-end"}>
          <CardActions>
            <Tooltip title="Review Rating & Report" arrow>
              <IconButton
                aria-label="Rating"
                sx={{ color: "darkblue" }}
                onClick={handleReview}
              >
                <LocalActivityIcon fontSize="medium" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Chat" arrow>
              <IconButton aria-label="Chat" sx={{ color: "darkblue" }}>
                <SmsIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Box>
      </Card>

      {/* Review and Report Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          style: { backgroundColor: "transparent" },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            height: 450,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            borderRadius: 4,
            p: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h6"
            align="center"
            sx={{ color: "darkblue", fontSize: "24px", mb: 3 }}
          >
            {reviewMode === "review" ? "Review and Rating" : "Report Tutor"}
          </Typography>

          <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
            <Button
              color="success"
              variant={reviewMode === "review" ? "contained" : "outlined"}
              onClick={() => setReviewMode("review")}
            >
              Review
            </Button>
            <Button
              color="error"
              variant={reviewMode === "report" ? "contained" : "outlined"}
              onClick={() => setReviewMode("report")}
              sx={{ ml: 2 }}
            >
              Report
            </Button>
          </Box>

          {reviewMode === "review" ? (
            <ReviewSection initialRating={0} subjectid={request.subjectId._id} studentid={Number(localStorage.getItem("userId"))} onClose={handleCloseModal} />)
            :
            (
              <ReportSection tutorEmail={request.tutorId.universityMail} onClose={handleCloseModal} />
            )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Tutorcardchat;
