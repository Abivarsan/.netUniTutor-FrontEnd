import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SmsIcon from "@mui/icons-material/Sms";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import {
  Box,
  CardHeader,
  IconButton,
  Rating,
  Modal,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import React from "react";

const darkblue = {
  100: "#C9DCF7",
  200: "#789CFF",
  400: "#3A66FF",
  500: "#0044FF",
  600: "#0037CC",
  900: "#001B80",
};

export default function Tutorcardchat({ initialRating = 3 }) {
  const [value, setValue] = React.useState<number | null>(0);
  const [comment, setComment] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    // Here you can handle the submission of comment and rating
    console.log("Submitted:", { comment, rating: value });
    // Reset comment and rating after submission
    setComment("");
    setValue(initialRating); // Reset to initial rating
    handleClose(); // Close modal after submission (if needed)
  };

  return (
    <Box height={300} width={600}>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          width: 300,
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
          title="Menushaa"
          subheader={
            <Rating
              name="read-only"
              value={initialRating} // Display initial rating on the card
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
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            ex eveniet alias aliquid sequi mollitia autem suscipit, asperiores,
            explicabo accusantium dolorum.
          </Typography>
        </CardContent>
        <Box display={"flex"} justifyContent={"flex-end"}>
          <CardActions>
            <IconButton
              aria-label="Rating"
              sx={{ color: "darkblue" }}
              onClick={handleOpen}
            >
              <LocalActivityIcon fontSize="medium" />
            </IconButton>

            <IconButton aria-label="Chat" sx={{ color: "darkblue" }}>
              <SmsIcon fontSize="medium" />
            </IconButton>
          </CardActions>
        </Box>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
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
            sx={{ color: "darkblue", fontSize: "40px" }}
          >
            Review and Rating
          </Typography>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="auto"
            sx={{
              mt: 3,
            }}
          >
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              sx={{ fontSize: "50px" }}
            />

            <TextField
              id="outlined"
              label="Add Comment here..."
              multiline
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{
                width: "100%",
                mt: 3,
                "& .MuiOutlinedInput-root": {
                  fontSize: "20px",
                  "& fieldset": {
                    borderColor: darkblue[500],
                  },
                  "&:hover fieldset": {
                    borderColor: darkblue[600],
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: darkblue[900],
                  },
                },
                "& .MuiInputLabel-root": {
                  fontSize: "20px", // Label text size
                  color: darkblue[500],
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: darkblue[900],
                },
              }}
            />

            <Button
              variant="outlined"
              size="large"
              sx={{ mt: 5, color: "darkblue" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
