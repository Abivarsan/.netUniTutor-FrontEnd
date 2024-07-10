// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import AccountBoxIcon from "@mui/icons-material/AccountBox";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import {
//   Avatar,
//   Box,
//   CardHeader,
//   CardMedia,
//   Grid,
//   IconButton,
// } from "@mui/material";
// import { RequestResponse } from "../data/interfaces";

// const darkblue = {
//   100: "#C9DCF7",
//   200: "#789CFF",
//   400: "#3A66FF",
//   500: "#0044FF",
//   600: "#0037CC",
//   900: "#001B80",
// };

// export default function RequestCard({
//   request,
//   onSelectRequest,
// }: {
//   request: RequestResponse;
//   onSelectRequest: (request: RequestResponse) => void;
// }) {
//   return (
//     <Box>
//       <Card
//         sx={{
//           borderRadius: 3,
//           boxShadow: 3,
//           transition: "transform 0.3s ease-in-out",
//           "&:hover": {
//             transform: "scale(1.01)",
//             cursor: "pointer",
//           },
//         }}
//       >
//         <CardHeader
//           title={request.studentId.firstName}
//           subheader={ request.studentId.grade}
//           sx={{
//             bgcolor: darkblue[100],
//             borderBottom: `1px solid ${darkblue[200]}`,
//           }}
//         />
//         <CardMedia
//           component="img"
//           alt="subject image"
//           height="140"
//           image={request.subjectId.coverImage}
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             {request.subjectId.title}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//           I’m {request.studentId.firstName}, a { request.studentId.grade} student from { request.studentId.district}, 
//           looking for a dedicated tutor to help me excel in {request.subjectId.title} .
//            I am eager to improve my understanding and performance in this subject to achieve my academic goals.
//             <IconButton
//               size="small"
//               sx={{
//                 float: "right",
//               }}
//               onClick={() => onSelectRequest(request)}
//             >
//               <ArrowForwardIosIcon fontSize="small" />
//             </IconButton>
//           </Typography>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }


import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Avatar,
  Box,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
} from "@mui/material";
import { RequestResponse } from "../data/interfaces";
import moment from "moment";

const darkblue = {
  100: "#C9DCF7",
  200: "#789CFF",
  400: "#3A66FF",
  500: "#0044FF",
  600: "#0037CC",
  900: "#001B80",
};

export default function RequestCard({
  request,
  onSelectRequest,
}: {
  request: RequestResponse;
  onSelectRequest: (request: RequestResponse) => void;
}) {
  return (
    <Box>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.01)",
            cursor: "pointer",
          },
        }}
      >
        <CardHeader
          title={request.studentId.firstName}
          subheader={<Typography
          variant="body2"
          fontWeight={"bold"}
          color={request.status === "PENDING" 
          ? "#f57c00" 
          : request.status === "ACCEPTED" 
          ? "#388e3c" 
          : "#d32f2f"} 
        >
          {request.status}
        </Typography>}
          
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
          <Typography gutterBottom variant="h5" component="div">
            {request.subjectId.title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            I’m {request.studentId.firstName}, a {request.studentId.grade} student from {request.studentId.district},
            looking for a dedicated tutor to help me excel in {request.subjectId.title} .
            I am eager to improve my understanding and performance in this subject to achieve my academic goals.


          </Typography>

          <Typography variant="body2" color="text.secondary">
            {moment(request.timestamp).format("MMMM Do YYYY, h:mm A")}
          </Typography>
          <IconButton
            size="small"
            sx={{
              float: "right",
              bottom: 10,
            }}
            disabled={request.status !== "PENDING"}
            onClick={() => onSelectRequest(request)}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </CardContent>
      </Card>
    </Box>
  );
}