import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Divider,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import { SubjectInputs } from "./SubjectForm";
import { Cancel, Edit } from "@mui/icons-material";

export default function SubjectCard({
  subject,
  setEditData,
  setDeleteData,
}: {
  subject: SubjectInputs;
  setEditData: (subject: SubjectInputs) => void;
  setDeleteData: (id: number) => void;
}) 


{
  return (
    <Card sx={{}}>
      <CardHeader
        action={
          <>
            <IconButton onClick={() => setDeleteData(subject._id!)}>
              <Cancel />
            </IconButton>
            <IconButton onClick={() => setEditData(subject)}>
              <Edit />
            </IconButton>
          </>
        }
        // title={subject.availability.join(", ")}
        title={
          <Typography
            sx={{
              color: "#1976d2",
              fontWeight: "bold",
            }}
            variant="inherit"
          >
            {subject.mode}
          </Typography>
        }
        // subheader={
        //   <Rating
        //     name="read-only"
        //     // value={subject.rating}
        //     precision={0.5}
        //     readOnly
        //     sx={{
        //       fontSize: 20,
        //     }}
        // }
      />
      <CardMedia
        component="img"
        alt="subject image"
        height="140"
        image={subject.coverImage}
      />
      <CardContent sx={{ p: 2, pb: 2 }}>
        <Typography gutterBottom variant="h5" component="div">
          {subject.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subject.description}
        </Typography>

        <Box py={1}>
          {subject.medium.map((medium) => (
            <Chip key={medium} label={medium} />
          ))}
        </Box>
        <Divider />
        <Box py={1} fontSize={"13px"} color={"#1976d2"}>
          {/* {subject.availability.map((day) => (
            <span key={day}>{day} </span>
          ))} */}
          {subject.availability.join(" | ")}
        </Box>
      </CardContent>
    </Card>
  );
}
