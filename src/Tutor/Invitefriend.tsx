import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios"; // Import axios for HTTP requests
import { toast } from "react-toastify";
import SendIcon from "@mui/icons-material/Send";
import handshake from ".././handshake.gif"

const InviteFriend: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const InvitedById = localStorage.getItem("userId");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleInvite = async () => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
      return;
    } else {
      setEmailError("");
    }

    try {
      console.log("Sending invitation to:", email, "from userId:", InvitedById); // Debug log
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:5025/api/Invitation/invite",
        { email, InvitedById }
      );
      console.log("Response:", response.data); // Debug log

      if (response.status === 200) {
        setEmail("");
        toast.success("Invitation sent successfully");
      } else {
        toast.error("Failed to send invitation");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error inviting friend:", error);
      toast.error("Failed to send invitation");
      setIsLoading(false);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={6} md={4}>
        <Box
          sx={{ bgcolor: "white", p: 3, mt: 3, borderRadius: 4 }}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ color: "darkblue", mt: 3 }}
          >
            Invite a Friend
          </Typography>
          <img src={handshake} alt="invite" style={{ width: "200px", height: "200px" }} />
          <Typography
            variant="body1"
            align="center"
            sx={{ color: "darkblue", mt: 3 }}
          >
            Invite a friend to our platform and both earn 50 coins as a reward!
            <Typography

              color="primary"
              onClick={() => setIsModalOpen(true)}
              sx={{ mt: 2, cursor: "pointer" }}
            >
              Seemore..
            </Typography>
            <Typography variant="body1" align="center" sx={{ color: "darkblue", mt: 3 }}>
              Enter your friend's email address to invite them
            </Typography>


          </Typography>



          <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <DialogTitle textAlign={'center'}>Invite friend</DialogTitle>

            <DialogContent>
              <Typography variant="body1" textAlign="center" sx={{ color: "darkblue", mt: 3 }}>
                Introduce new tutors to our platform and earn rewards together! Enter your new tutor's
                email and complete the email verification, and both of you will receive a reward. When the referred
                friend signs up and verifies their account using the promo code, both the existing tutor and the new tutor will
                receive coins in their coin wallet as a token of appreciation. It's a win-win situation for everyone involved –
                spread the word, share the benefits, and build a stronger community of tutors. Start sharing your code
                today and watch your rewards grow as you bring more tutors into our platform.


              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsModalOpen(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

          <Grid container justifyContent="center" mt={3}>
            <Grid item xs={12}>
              <TextField
                type="email"
                placeholder="Enter friend's email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
                fullWidth
                sx={{ mt: 1 }}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleInvite}
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size="1rem" /> : null}
                endIcon={<SendIcon />}
              >
                {isLoading ? "Sending..." : "Send Invitation"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default InviteFriend;
