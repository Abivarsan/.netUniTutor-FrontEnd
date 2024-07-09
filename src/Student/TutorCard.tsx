import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Rating from "@mui/material/Rating";
import { Box, CardHeader, Button, Avatar } from "@mui/material";

const darkblue = {
  100: "#C9DCF7",
  200: "#789CFF",
  400: "#3A66FF",
  500: "#0044FF",
  600: "#0037CC",
  900: "#001B80",
};

interface TutorCardProps {
  name: string;
  description: string;
  rating: number;
  onCancel: () => void;
}

const TutorCard: React.FC<TutorCardProps> = ({
  name,
  description,
  rating,
  onCancel,
}) => {
  return (
    <Box height={300} width={600} mb={2}>
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
          title={name}
          subheader={
            <Rating
              name="read-only"
              value={rating}
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
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{display:"flex", justifyContent:"flex-end"}}>
          <Button color="error" size="small" onClick={onCancel}>
            Cancel
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default TutorCard;
