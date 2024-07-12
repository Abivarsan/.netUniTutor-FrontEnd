import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { SubjectRequest } from "../data/interfaces";
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
            request.tutorId.profileUrl ? <Avatar src={request.tutorId.profileUrl} /> : <Avatar sx={{ bgcolor: darkblue[500] }}>
               <AccountBoxIcon fontSize="large" />
             </Avatar>
           }

          title={
            <Typography variant="h5" component="div">
              {request.subjectId.title}
            </Typography>
          }
          subheader={`${request.tutorId.firstName} ${request.tutorId.lastName}`}
          sx={{
            bgcolor: darkblue[100],
            borderBottom: `1px solid ${darkblue[200]}`,
          }}
        />
        <CardMedia
          component="img"
          alt="Subject Cover Image"
          height="140"
          image={request.subjectId.coverImage}
        />
        <CardContent>
          <Typography variant="body2" color="primary">
            Requested at:{" "}
            {moment(request.timestamp).format("MMMM Do YYYY, h:mm A")}
          </Typography>
          <Typography
            color={
              request.status === "PENDING"
                ? "#f57c00"
                : request.status === "REJECTED"
                  ? "#d32f2f"
                  : "#d32f2f"
            }
          >
            {request.status}
          </Typography>
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
