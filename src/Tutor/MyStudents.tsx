import { Box, Grid } from "@mui/material";
import Studentcardchat from "./Studentcardchat";

export default function MyStudents() {
  return (
    <Grid container sx={{ width: "1298px", height: "auto" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Studentcardchat />
        <Studentcardchat />
        <Studentcardchat />
      </Box>
    </Grid>
  );
}

