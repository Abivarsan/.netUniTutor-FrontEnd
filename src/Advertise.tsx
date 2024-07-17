// import React from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Button,
//   Paper,
//   IconButton,
// } from "@mui/material";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
// import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
// import PinDropRoundedIcon from "@mui/icons-material/PinDropRounded";
// import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";

// import Cover1 from "./Cover1.jpg"; // Replace with the correct path to your image
// import Cover2 from "./Cover2.jpg"; // Add additional images
// import Cover3 from "./Cover3.jpg";

// const CoverPage: React.FC = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2500,
//     arrows: false,
//     pauseOnHover: false,
//     draggable: false,
//     swipe: false,
//     touchMove: false,
//     responsive: [
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           initialSlide: 0,
//           autoplay: false,
//         },
//       },
//       {
//         breakpoint: 960,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           initialSlide: 0,
//           autoplay: false,
//         },
//       },
//       {
//         breakpoint: 1280,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           initialSlide: 0,
//           autoplay: true,
//         },
//       },
//     ],
//   };

//   const animationSettings = {
//     initial: { opacity: 0, y: 20 },
//     whileInView: { opacity: 1, y: 0 },
//     viewport: { once: false, amount: 0.8 },
//     transition: { duration: 0.5 },
//   };

//   return (
//     <>
//       <Grid container sx={{ minHeight: "100vh", paddingBottom: "5rem" }}>
//         <Box sx={{ position: "relative", width: "100%", height: "100vh" }}>
//           <Slider {...settings}>
//             {[Cover1, Cover2, Cover3].map((cover, index) => (
//               <Box key={index} position="relative" width="100%" height="100vh">
//                 <img
//                   src={cover}
//                   alt={`cover-${index}`}
//                   style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                 />
//                 <Box
//                   position="absolute"
//                   top={0}
//                   left={0}
//                   width="100%"
//                   height="100%"
//                   bgcolor="rgba(173, 216, 230, 0.5)"
//                 />
//               </Box>
//             ))}
//           </Slider>
//           <Box
//             sx={{
//               position: "absolute",
//               top: "0",
//               left: "0",
//               p: 3,
//               width: "100%",
//               height: "50%",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               textAlign: "center",
//               backgroundColor: "rgba(255, 255, 255, 0.5)",
//             }}
//           >
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 1 }}
//             >
//               <Typography
//                 variant="h3"
//                 fontWeight={"bold"}
//                 sx={{ color: "darkblue", mb: 2 }}
//               >
//                 UniTutor
//               </Typography>
//               <Typography variant="h4" sx={{ color: "darkblue" }}>
//                 Facilitating Interactive Learning Between Knowledge and Learners
//               </Typography>
//               <Box sx={{ mt: 2 }}>
//                 <Button
//                   variant="contained"
//                   sx={{ ml: 2, color: "darkblue" }}
//                   component={Link}
//                   to="/Register"
//                 >
//                   Signup
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   sx={{ ml: 2, color: "darkblue" }}
//                   component={Link}
//                   to="/login"
//                 >
//                   Signin
//                 </Button>
//               </Box>
//             </motion.div>
//           </Box>
//         </Box>

//         <Paper
//           elevation={3}
//           sx={{ padding: "2rem", backgroundColor: "#f5f5f5" }}
//         >
//           <Grid container spacing={3} mt={5}>
//             <Grid item xs={12} sm={6}>
//               <Box
//                 component={motion.div}
//                 {...animationSettings}
//                 sx={{ textAlign: "center" }}
//               >
//                 <Typography variant="h4" gutterBottom sx={{ color: "#00008B" }}>
//                   Signup safely
//                 </Typography>
//                 <Typography variant="body1" sx={{ color: "#00008B" }}>
//                   This feature ensures that users can sign up for UniTutor
//                   securely, protecting their personal information and ensuring
//                   privacy. It allows both students and tutors to create accounts
//                   safely, which is essential for building trust and confidence
//                   in using the platform.
//                 </Typography>
//               </Box>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <Box
//                 component={motion.div}
//                 {...animationSettings}
//                 transition={{ ...animationSettings.transition, delay: 0.2 }}
//                 sx={{ textAlign: "center" }}
//               >
//                 <Typography variant="h4" gutterBottom sx={{ color: "#00008B" }}>
//                   Find Your Ideal Match
//                 </Typography>
//                 <Typography variant="body1" sx={{ color: "#00008B" }}>
//                   UniTutor offers an advanced search functionality that enables
//                   students to find tutors based on specific academic needs and
//                   preferences. Users can search by subject expertise,
//                   availability, location, and other relevant criteria, making it
//                   easier to connect with the right tutor who meets their
//                   requirements.
//                 </Typography>
//               </Box>
//             </Grid>

//             <Grid item xs={12} sm={6} mt={5}>
//               <Box
//                 component={motion.div}
//                 {...animationSettings}
//                 transition={{ ...animationSettings.transition, delay: 0.4 }}
//                 sx={{ textAlign: "center" }}
//               >
//                 <Typography variant="h4" gutterBottom sx={{ color: "#00008B" }}>
//                   Transparent Feedback
//                 </Typography>
//                 <Typography variant="body1" sx={{ color: "#00008B" }}>
//                   Students can access and read reviews and ratings provided by
//                   other students who have used the tutoring services on
//                   UniTutor. This transparency helps users make informed
//                   decisions about which tutor to choose based on the experiences
//                   and feedback shared by their peers.
//                 </Typography>
//               </Box>
//             </Grid>

//             <Grid item xs={12} sm={6} mt={5}>
//               <Box
//                 component={motion.div}
//                 {...animationSettings}
//                 transition={{ ...animationSettings.transition, delay: 0.6 }}
//                 sx={{ textAlign: "center" }}
//               >
//                 <Typography variant="h4" gutterBottom sx={{ color: "#00008B" }}>
//                   Easier Payment System
//                 </Typography>
//                 <Typography variant="body1" sx={{ color: "#00008B" }}>
//                   UniTutor utilizes a coin-based payment system, where users can
//                   pay for tutoring services using coins. This system simplifies
//                   the payment process and enhances user experience by providing
//                   a straightforward method for transactions. Users can purchase
//                   coins securely through the platform and use them to pay
//                   tutors, ensuring convenience and ease of use.
//                 </Typography>
//               </Box>
//             </Grid>

//             <Grid item xs={12} mt={5}>
//               <Box
//                 component={motion.div}
//                 {...animationSettings}
//                 transition={{ ...animationSettings.transition, delay: 0.8 }}
//                 sx={{ textAlign: "center" }}
//               >
//                 <Typography variant="h4" gutterBottom sx={{ color: "#00008B" }}>
//                   Real Time Communication
//                 </Typography>
//                 <Typography variant="body1" sx={{ color: "#00008B" }}>
//                   Communicate directly with your accepted tutor to ask questions
//                   and schedule sessions. Once a tutor accepts your request, you
//                   can use our platform's chat system to communicate with them.
//                   This feature allows for direct and instant messaging, making
//                   it easy to clarify doubts, discuss learning plans, and
//                   coordinate schedules, ensuring a seamless and productive
//                   tutoring experience.
//                 </Typography>
//               </Box>
//             </Grid>
//           </Grid>
//         </Paper>

//         <Box
//           sx={{
//             bgcolor: "#042B67",
//             color: "white",
//             p: 4,
//             width: "100%",
//             height: 500,
//           }}
//         >
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={4}>
//               <Typography variant="h6" gutterBottom>
//                 Contact Us
//               </Typography>
//               <Typography variant="body2">
//                 <IconButton
//                   size="large"
//                   sx={{
//                     color: "white",
//                     backgroundColor: "#3F78CF",
//                     borderRadius: "50%",
//                     padding: "0.5rem",
//                     mr:2
//                   }}
//                 >
//                   <EmailRoundedIcon />
//                 </IconButton>
//                 unititor@gmail.com
//               </Typography>
//               <Typography variant="body2" sx={{ mt: 2 }}>
//                 <IconButton
//                   size="large"
//                   sx={{
//                     color: "white",
//                     backgroundColor: "#3F78CF",
//                     borderRadius: "50%",
//                     padding: "0.5rem",
//                     mr:2
//                   }}
//                 >
//                   <LocalPhoneRoundedIcon />
//                 </IconButton>
//                  +94 763460985
//               </Typography>
//               <Typography variant="body2" sx={{ mt: 2 }}>
//                 <IconButton
//                   size="large"
//                   sx={{
//                     color: "white",
//                     backgroundColor: "#3F78CF",
//                     borderRadius: "50%",
//                     padding: "0.5rem",
//                     mr:2
//                   }}
//                 >
//                   <PinDropRoundedIcon />
//                 </IconButton>
//                  123  Lane, Education City, WebStackers
//               </Typography>
//             </Grid>

//             <Grid item xs={12} sm={4}>
//               <Typography variant="h6" gutterBottom>
//                 Follow Us
//               </Typography>
//               <Typography variant="body2" sx={{ mt: 2 }}>
//                 <IconButton
//                   size="large"
//                   sx={{
//                     color: "white",
//                     backgroundColor: "#3F78CF",
//                     borderRadius: "50%",
//                     padding: "0.5rem",
//                     mr:2
//                   }}
//                 >
//                   <FacebookRoundedIcon />
//                 </IconButton>
//                 facebook.com/unitutor
//               </Typography>
//               <Typography variant="body2" sx={{ mt: 2 }}>
//                 <IconButton
//                   size="large"
//                   sx={{
//                     color: "white",
//                     backgroundColor: "#3F78CF",
//                     borderRadius: "50%",
//                     padding: "0.5rem",
//                     mr:2
//                   }}
//                 >
//                   <TwitterIcon />
//                 </IconButton>
//                 twitter.com/unitutor
//               </Typography>
//               <Typography variant="body2" sx={{ mt: 2 }}>
//                 <IconButton
//                   size="large"
//                   sx={{
//                     color: "white",
//                     backgroundColor: "#3F78CF",
//                     borderRadius: "50%",
//                     padding: "0.5rem",
//                     mr:2
//                   }}
//                 >
//                   <InstagramIcon />
//                 </IconButton>
//                 instagram.com/unitutor
//               </Typography>
//             </Grid>

//             <Grid item xs={12} sm={4}>
//               <Typography variant="h6" gutterBottom>
//                 Useful Links
//               </Typography>
//               <Typography variant="body2" mt={2}>Terms of Service</Typography>
//               <Typography variant="body2"mt={2}>Privacy Policy</Typography>
//               <Typography variant="body2"mt={2} >FAQs</Typography>
//             </Grid>
//           </Grid>
//         </Box>
//       </Grid>
//     </>
//   );
// };

// export default CoverPage;

import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  AccordionSummary,
  AccordionDetails,
  Accordion,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import PinDropRoundedIcon from "@mui/icons-material/PinDropRounded";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AcceptanceOfTerms,
  UserAccounts,
  PlatformUsage,
  TutorStudentInteraction,
  PaymentAndCoins,
  ReviewsAndFeedback,
  PrivacyAndDataProtection,
  IntellectualProperty,
  Termination,
  LimitationOfLiability,
  ChangesToTerms,
  GoverningLaw,
} from "./Termofuse";

import Cover1 from "./Cover1.jpg"; // Replace with the correct path to your image
import Cover2 from "./Cover2.jpg"; // Add additional images
import Cover3 from "./Cover3.jpg";
import { LinkedIn } from "@mui/icons-material";

const CoverPage: React.FC = () => {
  const [openTerms, setOpenTerms] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [openFAQs, setOpenFAQs] = useState(false);

  const handleOpenTerms = () => setOpenTerms(true);
  const handleCloseTerms = () => setOpenTerms(false);

  const handleOpenPrivacy = () => setOpenPrivacy(true);
  const handleClosePrivacy = () => setOpenPrivacy(false);

  const handleOpenFAQs = () => setOpenFAQs(true);
  const handleCloseFAQs = () => setOpenFAQs(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    pauseOnHover: false,
    draggable: false,
    swipe: false,
    touchMove: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          autoplay: false,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          autoplay: false,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          autoplay: true,
        },
      },
    ],
  };

  const animationSettings = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.8 },
    transition: { duration: 0.5 },
  };

  return (
    <>
      <Grid container sx={{ minHeight: "100vh", paddingBottom: "5rem" }}>
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
              height: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <Typography
                variant="h3"
                fontWeight={"bold"}
                sx={{ color: "darkblue", mb: 2 }}
              >
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
            </motion.div>
          </Box>
        </Box>

        <Paper
          elevation={3}
          sx={{ padding: "2rem", backgroundColor: "#f5f5f5" }}
        >
          <Grid container spacing={3} mt={5}>
            <Grid item xs={12} sm={6}>
              <Box
                component={motion.div}
                {...animationSettings}
                sx={{ textAlign: "center" }}
              >
                <Typography variant="h4" gutterBottom sx={{ color: "#00008B" }}>
                  Signup safely
                </Typography>
                <Typography variant="body1" sx={{ color: "#00008B" }}>
                  This feature ensures that users can sign up for UniTutor
                  securely, protecting their personal information and ensuring
                  privacy. It allows both students and tutors to create accounts
                  safely, which is essential for building trust and confidence
                  in using the platform.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box
                component={motion.div}
                {...animationSettings}
                transition={{ ...animationSettings.transition, delay: 0.2 }}
                sx={{ textAlign: "center" }}
              >
                <Typography variant="h4" gutterBottom sx={{ color: "#00008B" }}>
                  Find Your Ideal Match
                </Typography>
                <Typography variant="body1" sx={{ color: "#00008B" }}>
                  UniTutor offers an advanced search functionality that enables
                  students to find tutors based on specific academic needs and
                  preferences. Users can search by subject expertise,
                  availability, location, and other relevant criteria, making it
                  easier to connect with the right tutor who meets their
                  requirements.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} mt={5}>
              <Box
                component={motion.div}
                {...animationSettings}
                transition={{ ...animationSettings.transition, delay: 0.4 }}
                sx={{ textAlign: "center" }}
              >
                <Typography variant="h4" gutterBottom sx={{ color: "#00008B" }}>
                  Transparent Feedback
                </Typography>
                <Typography variant="body1" sx={{ color: "#00008B" }}>
                  Students can access and read reviews and ratings provided by
                  other students who have used the tutoring services on
                  UniTutor. This transparency helps users make informed
                  decisions about which tutor to choose based on the experiences
                  and feedback shared by their peers.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} mt={5}>
              <Box
                component={motion.div}
                {...animationSettings}
                transition={{ ...animationSettings.transition, delay: 0.6 }}
                sx={{ textAlign: "center" }}
              >
                <Typography variant="h4" gutterBottom sx={{ color: "#00008B" }}>
                  Easier Payment System
                </Typography>
                <Typography variant="body1" sx={{ color: "#00008B" }}>
                  UniTutor utilizes a coin-based payment system, where users can
                  pay for tutoring services using coins. This system simplifies
                  the payment process and enhances user experience by providing
                  a straightforward method for transactions. Users can purchase
                  coins securely through the platform and use them to pay
                  tutors, ensuring convenience and ease of use.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} mt={5}>
              <Box
                component={motion.div}
                {...animationSettings}
                transition={{ ...animationSettings.transition, delay: 0.8 }}
                sx={{ textAlign: "center" }}
              >
                <Typography variant="h4" gutterBottom sx={{ color: "#00008B" }}>
                  Real Time Communication
                </Typography>
                <Typography variant="body1" sx={{ color: "#00008B" }}>
                  Communicate directly with your accepted tutor to ask questions
                  and schedule sessions. Once a tutor accepts your request, you
                  can use our platform's chat system to communicate with them.
                  This feature allows for direct and instant messaging, making
                  it easy to clarify doubts, discuss learning plans, and
                  coordinate schedules, ensuring a seamless and productive
                  tutoring experience.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Box
          sx={{
            bgcolor: "#042B67",
            color: "white",
            p: 4,
            width: "100%",
            height: 500,
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2">
                <IconButton
                  size="large"
                  sx={{
                    color: "white",
                    backgroundColor: "#3F78CF",
                    borderRadius: "50%",
                    padding: "0.5rem",
                    mr: 2,
                  }}
                >
                  <EmailRoundedIcon />
                </IconButton>
                unititor@gmail.com
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                <IconButton
                  size="large"
                  sx={{
                    color: "white",
                    backgroundColor: "#3F78CF",
                    borderRadius: "50%",
                    padding: "0.5rem",
                    mr: 2,
                  }}
                >
                  <LocalPhoneRoundedIcon />
                </IconButton>
                +94 763460985
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                <IconButton
                  size="large"
                  sx={{
                    color: "white",
                    backgroundColor: "#3F78CF",
                    borderRadius: "50%",
                    padding: "0.5rem",
                    mr: 2,
                  }}
                >
                  <PinDropRoundedIcon />
                </IconButton>
                123 Lane, Education City, WebStackers
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                <IconButton
                  size="large"
                  sx={{
                    color: "white",
                    backgroundColor: "#3F78CF",
                    borderRadius: "50%",
                    padding: "0.5rem",
                    mr: 2,
                  }}
                >
                  <FacebookRoundedIcon />
                </IconButton>
                facebook.com/UniTutor
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                <IconButton
                  size="large"
                  sx={{
                    color: "white",
                    backgroundColor: "#3F78CF",
                    borderRadius: "50%",
                    padding: "0.5rem",
                    mr: 2,
                  }}
                >
                  <TwitterIcon />
                </IconButton>
                twitter.com/UniTutor
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                <IconButton
                  size="large"
                  sx={{
                    color: "white",
                    backgroundColor: "#3F78CF",
                    borderRadius: "50%",
                    padding: "0.5rem",
                    mr: 2,
                  }}
                >
                  <InstagramIcon />
                </IconButton>
                instagram.com/UniTutor
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                <IconButton
                  size="large"
                  sx={{
                    color: "white",
                    backgroundColor: "#3F78CF",
                    borderRadius: "50%",
                    padding: "0.5rem",
                    mr: 2,
                  }}
                >
                  <LinkedIn />
                </IconButton>
                linkdin.com/UniTutor
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Useful Links
              </Typography>
              <Typography
                variant="body2"
                mt={2}
                onClick={handleOpenTerms}
                sx={{ cursor: "pointer" }}
              >
                Terms of Service
              </Typography>
              <Typography
                variant="body2"
                mt={2}
                onClick={handleOpenPrivacy}
                sx={{ cursor: "pointer" }}
              >
                Privacy Policy
              </Typography>
              <Typography
                variant="body2"
                mt={2}
                onClick={handleOpenFAQs}
                sx={{ cursor: "pointer" }}
              >
                FAQs
              </Typography>
            </Grid>
          </Grid>
          <Typography
                variant="body2"
                color="white"
                align="center"
                sx={{ mt: 10 }}
              >
                {"Copyright © "}
                <Link color="inherit" to={""} >
                  UniTutor
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
              </Typography>
        </Box>
      </Grid>

      <Dialog open={openTerms} onClose={handleCloseTerms}>
        <DialogTitle>Terms of Service</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <AcceptanceOfTerms />
            <UserAccounts />
            <PlatformUsage />
            <TutorStudentInteraction />
            <PaymentAndCoins />
            <ReviewsAndFeedback />
            <PrivacyAndDataProtection />
            <IntellectualProperty />
            <Termination />
            <LimitationOfLiability />
            <ChangesToTerms />
            <GoverningLaw />
            <Typography variant="caption" sx={{ mt: 2 }} textAlign={"center"}>
              Last updated: 1st June 2024
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTerms} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openPrivacy} onClose={handleClosePrivacy}>
        <DialogTitle>Privacy Policy</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Section title="Privacy Policy">
              <Typography variant="body1">
                <strong>Introduction</strong>
                <br />
                Welcome to UniTutor. We value your privacy and are committed to
                protecting your personal information. This Privacy Policy
                outlines how we collect, use, and safeguard your data when you
                use our platform.
              </Typography>

              <Section title="Information We Collect">
                <Typography variant="body1">
                  <strong>1. Personal Information:</strong>
                  <br />
                  When you register on UniTutor, we collect personal details
                  such as your name, email address, phone number, and payment
                  information.
                </Typography>
                <Typography variant="body1">
                  <strong>2. Usage Data:</strong>
                  <br />
                  We collect information about how you use our platform,
                  including your browsing history, search queries, and
                  interactions with tutors and students.
                </Typography>
                <Typography variant="body1">
                  <strong>3. Cookies:</strong>
                  <br />
                  Our platform uses cookies to enhance your user experience.
                  Cookies are small files stored on your device that help us
                  remember your preferences and improve our services.
                </Typography>
              </Section>

              <Section title="How We Use Your Information">
                <Typography variant="body1">
                  <strong>1. To Provide Services:</strong>
                  <br />
                  We use your personal information to facilitate connections
                  between tutors and students, process payments, and provide
                  customer support.
                </Typography>
                <Typography variant="body1">
                  <strong>2. To Improve Our Platform:</strong>
                  <br />
                  Usage data helps us understand how our platform is used and
                  identify areas for improvement.
                </Typography>
                <Typography variant="body1">
                  <strong>3. For Communication:</strong>
                  <br />
                  We may send you emails or messages about updates, promotions,
                  and important information related to your account.
                </Typography>
                <Typography variant="body1">
                  <strong>4. For Security:</strong>
                  <br />
                  We use your information to protect against fraud, unauthorized
                  access, and other security issues.
                </Typography>
              </Section>

              <Section title="Sharing Your Information">
                <Typography variant="body1">
                  <strong>1. With Tutors and Students:</strong>
                  <br />
                  When you use our platform, your profile information is visible
                  to other users to facilitate connections.
                </Typography>
                <Typography variant="body1">
                  <strong>2. With Third-Party Service Providers:</strong>
                  <br />
                  We may share your information with third parties that provide
                  services such as payment processing, data analysis, and email
                  delivery.
                </Typography>
                <Typography variant="body1">
                  <strong>3. Legal Requirements:</strong>
                  <br />
                  We may disclose your information if required by law or in
                  response to legal processes.
                </Typography>
              </Section>

              <Section title="Your Choices">
                <Typography variant="body1">
                  <strong>1. Access and Update:</strong>
                  <br />
                  You can access and update your personal information through
                  your account settings.
                </Typography>
                <Typography variant="body1">
                  <strong>2. Opt-Out:</strong>
                  <br />
                  You can opt-out of receiving promotional emails by following
                  the unsubscribe link in the emails.
                </Typography>
                <Typography variant="body1">
                  <strong>3. Cookies:</strong>
                  <br />
                  You can control cookies through your browser settings.
                  However, disabling cookies may affect your experience on our
                  platform.
                </Typography>
              </Section>

              <Section title="Security">
                <Typography variant="body1">
                  We implement advanced security measures to protect your
                  personal information. However, no method of transmission over
                  the internet or electronic storage is completely secure, and
                  we cannot guarantee absolute security.
                </Typography>
              </Section>

              <Section title="Changes to This Privacy Policy">
                <Typography variant="body1">
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  our website and updating the effective date.
                </Typography>
              </Section>

              <Section title="Contact Us">
                <Typography variant="body1">
                  If you have any questions or concerns about this Privacy
                  Policy, please contact us at:
                  <br />
                  <strong>Email:</strong> unitutor@gmail.com
                  <br />
                  <strong>Address:</strong> 123 Lane, Education City, WebStackers
                </Typography>
              </Section>
            </Section>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePrivacy} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openFAQs} onClose={handleCloseFAQs}>
        <DialogTitle>Frequently Asked Questions (FAQ)</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Q1: What is UniTutor?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  UniTutor is an online platform that connects school students
                  with qualified university undergraduates and lectures for
                  personalized academic support. Our goal is to facilitate
                  seamless communication and collaboration between students and
                  tutors.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  Q2: How do I sign up for UniTutor?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Signing up for UniTutor is easy! Click on the "Sign Up" button
                  on the homepage and follow the instructions to create your
                  account. Ensure you provide accurate information for a secure
                  registration process.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  Q3: How can I find a tutor that fits my needs?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Use our advanced search and filter options to find tutors
                  based on subjects, availability, location, and other
                  preferences. You can also read reviews from other students to
                  help you make an informed decision.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  Q4: How do the coin-based payments work?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  UniTutor uses a coin-based system for payments. You can
                  purchase coins through our secure payment gateway. Tutors
                  require coins to accept student requests, and 1 coin is
                  equivalent to 20 LKR. This system ensures secure and
                  straightforward transactions.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  Q5: Can I communicate with my tutor through the platform?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Yes! Once a tutor accepts your request, you can use our
                  real-time chat system to communicate directly. This feature
                  allows you to discuss topics, schedule sessions, and ask
                  questions conveniently.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  Q6: What should I do if I have a problem with a tutor or
                  student?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  If you encounter any issues, please contact our support team
                  through the "Contact Us" section. We are here to help resolve
                  any problems and ensure a positive experience on UniTutor.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  Q7: How are reviews and ratings managed on UniTutor?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  After each tutoring interaction, students can leave reviews
                  and ratings for their tutors. This feedback is visible to
                  other users, helping them make informed choices. Tutors can
                  also view their reviews to improve their services.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  Q8: Is my personal information safe on UniTutor?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Yes, we prioritize your privacy and security. Our platform
                  uses advanced encryption and security measures to protect your
                  personal data and ensure a safe online environment.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  Q9: How can tutors earn coins on the platform?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Tutors can earn coins by inviting friends to join UniTutor.
                  Additionally, tutors can purchase coins through our secure
                  payment gateway.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  Q10: Can I invite friends to join UniTutor?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Absolutely! Tutors have the option to invite friends via
                  email. When your friend registers and enters the verification
                  code, both of you will receive additional coins as a reward.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  Q11: What is the process for purchasing coins?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  To purchase coins, go to the "Coin Bank" section on your
                  dashboard, select the number of coins you want to buy, and
                  complete the transaction using our secure payment gateway.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  Q12: How do I edit my profile?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  You can edit your profile by going to the "Edit Profile"
                  section on your dashboard. Here, you can update your personal
                  information, profile picture, and other details.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFAQs} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CoverPage;



interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div style={{ marginBottom: "20px" }}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <div>
      {children}
    </div>
  </div>
);