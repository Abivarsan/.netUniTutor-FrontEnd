import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Cover1 from "./Cover1.jpg"; // Replace with the correct path to your image
import Cover2 from "./Cover2.jpg"; // Add additional images
import Cover3 from "./Cover3.jpg";
import { Link } from "react-router-dom";

const CoverPage: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false, // Hide the navigation arrows
    pauseOnHover: false, // Prevent pausing on hover
    draggable: false, // Disable dragging
    swipe: false, // Disable swipe
    touchMove: false, // Disable touch move
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          autoplay: false, // Disable autoplay on smaller screens
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          autoplay: false, // Disable autoplay on medium screens
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          autoplay: true, // Enable autoplay on larger screens
        },
      },
    ],
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Box sx={{ position: "relative", width: "100%", height: "100vh" }}>
        <Slider {...settings}>
          {[Cover1, Cover2, Cover3].map((cover, index) => (
            <Box key={index} position="relative" width="100%" height="100vh">
              <img
                src={cover}
                alt={`cover-${index}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <Box
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                bgcolor="rgba(173, 216, 230, 0.5)"
              />
            </Box>
          ))}
        </Slider>
        <Box
          sx={{
            position: "absolute",
            top: "0",
            left: "0",
            p: 3,
            width: "100%",
            height:"50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.5)", // Adjust the background color opacity as needed
          }}
        >
          <Typography variant="h3" fontWeight={"bold"} sx={{ color: "darkblue", mb: 2 }}>
            UniTutor
          </Typography>
          <Typography variant="h4" sx={{ color: "darkblue" }}>
            Facilitating Interactive Learning Between Knowledge and Learners
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              sx={{ ml: 2, color: "darkblue" }}
              component={Link}
              to="/Register"
            >
              Signup
            </Button>
            <Button
              variant="outlined"
              sx={{ ml: 2, color: "darkblue" }}
              component={Link}
              to="/signin"
            >
              Signin
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default CoverPage;
