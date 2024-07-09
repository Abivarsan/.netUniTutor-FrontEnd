import { Box, Grid } from "@mui/material";
import Tutorcardchat from "./Tutorcardchat";

export default function MyTutors() {
  return (
    
    <Grid container p={3} spacing={4} sx={{ width: '100%', height: '100%' }}>
      {[1, 2, 3].map((key) => (
        <Grid
          container
          item
          sm={12}
          spacing={3}
          display="flex"
          justifyContent="space-evenly"
          key={key}
        >
          <Grid item sm={3}>
            <Tutorcardchat />
          </Grid>
          <Grid item sm={3}>
            <Tutorcardchat />
          </Grid>
          <Grid item sm={3}>
            <Tutorcardchat />
          </Grid>
        </Grid>
      ))}
    </Grid>
   
  );
}
