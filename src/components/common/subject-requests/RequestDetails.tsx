import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { RequestResponse } from "../../../data/interfaces";
import { Cancel, Edit } from "@mui/icons-material";
import moment from "moment";

export default function RequestDetails({
  request,
  handleRequest,
}: {
  request: RequestResponse;
  handleRequest: (id: string, isAccept: boolean) => void;
}) {
  return (
    <>
      <Card variant="outlined" sx={{ minWidth: 450 }}>
        <CardHeader
          //   action={
          //     <>
          //       <IconButton>
          //         <Cancel />
          //       </IconButton>
          //       <IconButton>
          //         <Edit />
          //       </IconButton>
          //     </>
          //   }
          title={request.studentId.firstName}
          subheader={
            <Typography sx={{}} variant="inherit">
              {request.studentId.phoneNumber + " | " + request.studentId.email}
            </Typography>
          }
        />
        <CardMedia
          component="img"
          alt="subject image"
          height="140"
          image={request.subjectId.coverImage}
        />
        <CardContent sx={{ p: 2, pb: 2 }}>
          <Typography gutterBottom variant="h5" component="div">
            {request.subjectId.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Student Name: {request.studentId.firstName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Grade: {request.studentId.grade}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            District: {request.studentId.district}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            School/University: {request.studentId.schoolName}
          </Typography>

          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" sx={{ color: "#1976d2" }}>
            {moment(request.timestamp).format("MMMM Do YYYY, h:mm A")}
          </Typography>
          <Typography variant="body2" sx={{ color: "#1976d2" }}>
            {request.status}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            aria-label="share"
            color="success"
            size="small"
            onClick={() => handleRequest(request._id, true)}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            aria-label="share"
            color="error"
            size="small"
            onClick={() => handleRequest(request._id, false)}
          >
            Reject
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
