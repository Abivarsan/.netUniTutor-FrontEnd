import {
  FormControl,
  Grid,
  Input,
  inputClasses,
  Typography,
} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CopyToClipboardComponent from "./Copyclip";
import { blue, grey } from "@mui/material/colors";
import { styled } from "@mui/system";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 4, 
  p: 10,
};
export default function InviteFriend() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item sm={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ color: "darkblue", fontSize: 35, mt: 3 }}>
            Invite Friend
          </Typography>
        </Box>

        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "darkblue",
            fontSize: 20,
            mt: 3,
          }}
        >
          Give the gift of coin to your friend
        </Typography>

        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "darkblue",
            fontSize: 20,
            mt: 3,
          }}
        >
          You both get the promo when your friend create first account as a
          tutor <Button onClick={handleOpen}>See more…</Button>
        </Typography>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "darkblue",
            fontSize: 20,
            mt: 5,
          }}
        >
          You both can get 100 coins
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "darkblue",
            mt: 25,
          }}
        >
          <CopyToClipboardComponent />
        </Box>

        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="keep-mounted-modal-title"
              variant="h4"
              component="h2"
              textAlign={"center"}
              color= "darkblue"
            >
              Invite friends
            </Typography>
            <Typography textAlign={"center"} id="keep-mounted-modal-description" sx={{ mt: 2,color:"darkblue"
             }}>
              Introduce new tutors to our platform and earn rewards together!
              You can share their unique promo code with friends, instructing
              them to use it during registration. When the referred friend signs
              up using the promo code, both the existing tutor and the new tutor
              will receive coins as a token of appreciation. It's a win-win
              situation for everyone involved – spread the word, share the
              benefits, and build a stronger community of tutors. Start sharing
              your code today and watch your rewards grow as you bring more
              tutors into our platform
            </Typography>
          </Box>
        </Modal>
      </Grid>
    </Grid>
  );
}

const StyledInput = styled(Input)(
  ({ theme }) => `

  .${inputClasses.input} {
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }
  }
`
);
