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
          subheader={"Grade: " + request.studentId.grade}
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            ex eveniet alias aliquid sequi mollitia autem suscipit, asperiores,
            explicabo accusantium dolorum.
            <IconButton
              size="small"
              sx={{
                float: "right",
              }}
              onClick={() => onSelectRequest(request)}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
