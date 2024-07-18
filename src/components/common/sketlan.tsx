import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";

export default function Variants() {
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item sm={5}>
        <Stack spacing={1} p={2} my={8}>
          {/* For variant="text", adjust the height via font-size */}

          <Box display="flex" justifyContent="center">
            <Skeleton animation="wave" variant="rounded" width="70%" height={500} />
          </Box>
        </Stack>
      </Grid>
      <Grid
        item
        container
        sm={7}
        my={10}
        sx={{ display: "flex", justifyContent: "space-around" }}
      >
        <Grid item>
          <Skeleton animation="wave"  variant="rectangular" width={230} height={120} />
        </Grid>
        <Grid item>
          <Skeleton  animation="wave" variant="rectangular" width={230} height={120} />
        </Grid>

        <Grid item>
          <Skeleton animation="wave"  variant="rectangular" width={230} height={120} />
        </Grid>
        <Box mb={9}>
          <Grid item>
            <Skeleton animation="wave"  variant="rectangular" width={800} height={300} />
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
