import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

export default function Variants() {
    return (
        <Grid container sx={{ height: "100vh" }}>
            <Grid item sm={2}></Grid>
            <Grid item sm={3}>
                <Stack spacing={1} my={18}>
                    {/* For variant="text", adjust the height via font-size */}
                    <Box display="flex" justifyContent="center">
                        <Skeleton variant="text" width={300} height={50} />
                    </Box>
                    {/* Center the circular Skeleton */}
                    <Box display="flex" justifyContent="center">
                        <Skeleton variant="circular" width={150} height={150} />
                    </Box>

                    {/* Center the rectangular Skeleton */}
                    <Box display="flex" justifyContent="center">
                        <Skeleton variant="rectangular" width={300} height={60} />
                    </Box>

                    {/* Center the rounded Skeleton */}
                    <Box display="flex" justifyContent="center">
                        <Skeleton variant="rounded" width={300} height={60} />
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Skeleton variant="rounded" width={300} height={60} />
                    </Box>
                </Stack>
            </Grid>
            <Grid item container sm={7} my={18}  sx={{  display: "flex", justifyContent: "space-around" }}>
                <Grid item>
                    <Skeleton variant="rectangular" width={200} height={150} />
                </Grid>
                <Grid item>
                    <Skeleton variant="rectangular" width={200} height={150} />
                </Grid>

                <Grid item>
                    <Skeleton variant="rectangular" width={200} height={150} />
                </Grid>

            </Grid>


        </Grid >

    );
}
