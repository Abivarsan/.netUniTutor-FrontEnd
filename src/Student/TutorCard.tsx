// import React from "react";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
// import AccountBoxIcon from "@mui/icons-material/AccountBox";
// import Rating from "@mui/material/Rating";
// import { Box, CardHeader, Button, Avatar } from "@mui/material";

// const darkblue = {
//   100: "#C9DCF7",
//   200: "#789CFF",
//   400: "#3A66FF",
//   500: "#0044FF",
//   600: "#0037CC",
//   900: "#001B80",
// };

// interface TutorCardProps {
//   name: string;
//   description: string;
//   rating: number;
//   onCancel: () => void;
// }

// const TutorCard: React.FC<TutorCardProps> = ({
//   name,
//   description,
//   rating,
//   onCancel,
// }) => {
//   return (
//     <Box height={300} width={600} mb={2}>
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
//           title={name}
//           subheader={
//             <Rating
//               name="read-only"
//               value={rating}
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
//             {description}
//           </Typography>
//         </CardContent>
//         <CardActions sx={{display:"flex", justifyContent:"flex-end"}}>
//           <Button color="error" size="small" onClick={onCancel}>
//             Cancel
//           </Button>
//         </CardActions>
//       </Card>
//     </Box>
//   );
// };

// export default TutorCard;

import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Rating from "@mui/material/Rating";
import { Box, CardHeader, Button, Avatar, CardMedia } from "@mui/material";
import { RequestResponse, SubjectRequest } from "../data/interfaces";
import moment from "moment";

const darkblue = {
  100: "#C9DCF7",
  200: "#789CFF",
  400: "#3A66FF",
  500: "#0044FF",
  600: "#0037CC",
  900: "#001B80",
};

interface TutorCardProps {
  request: SubjectRequest;
  onCancel: () => void;
}

const TutorCard: React.FC<TutorCardProps> = ({ request, onCancel }) => {
  return (
    <Box mb={2}>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: darkblue[500] }}>
              <AccountBoxIcon fontSize="large" />
            </Avatar>
          }
          title={
            <Typography variant="h5" component="div">
              {request.subjectId.title}
            </Typography>
          }
          subheader={request.tutorId.firstName + " " + request.tutorId.lastName}
          sx={{
            bgcolor: darkblue[100],
            borderBottom: `1px solid ${darkblue[200]}`,
          }}
        />
        <CardMedia
          component="img"
          alt="subject image"
          height="140"
          image={request.subjectId.coverImage}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Requested at:{" "}
            {moment(request.timestamp).format("MMMM Do YYYY, h:mm A")}
          </Typography>
          <Typography>{request.status}</Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button color="error" size="small" onClick={onCancel}>
            Cancel
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default TutorCard;
