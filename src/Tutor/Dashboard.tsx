import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CallReceivedSharpIcon from "@mui/icons-material/CallReceivedSharp";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { keyframes } from "@emotion/react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Typography,
  Avatar,
  Rating,
} from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import BlockIcon from "@mui/icons-material/Block";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Variants from "../components/common/sketlan";
import Todotutor from "./TodoTutor";

const darkblue = {
  100: "#C9DCF7",
  200: "#789CFF",
  400: "#3A66FF",
  500: "#0044FF",
  600: "#0037CC",
  900: "#001B80",
};

interface Tutor {
  firstName: string;
  lastName: string;
  universityMail: string;
  phoneNumber: string;
  profileUrl: string;
  rating: number;
}

interface TodoItem {
  id: number;
  text: string;
  isCompleted: boolean;
}

export default function Dashboard() {
  const [mySubjectsCount, setMySubjectsCount] = useState<number>(0);
  const [acceptedRequestsCount, setAcceptedRequestsCount] = useState<number>(0);
  const [coinsCount, setCoinsCount] = useState<number>(0);
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [todoInput, setTodoInput] = useState<string>("");

  const tutorId = localStorage.getItem("userId");
  //  const tutorId=2;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tutorResponse = await axios.get<Tutor>(
          `http://localhost:5025/api/Tutor/details/${tutorId}`
        );
        setTutor(tutorResponse.data);

        const mySubjectsResponse = await axios.get<number>(
          `http://localhost:5025/api/Request/${tutorId}/mystudentcount`
        );
        setMySubjectsCount(mySubjectsResponse.data);

        const acceptedRequestsResponse = await axios.get<number>(
          `http://localhost:5025/api/Request/${tutorId}/pendingrequestcount`
        );
        setAcceptedRequestsCount(acceptedRequestsResponse.data);

        const coinsCountResponse = await axios.get<number>(
          `http://localhost:5025/api/Transaction/totalamount/${tutorId}`
        );
        setCoinsCount(coinsCountResponse.data);

        
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (tutorId) {
      fetchData();
    }
  }, [tutorId]);



  const typing = keyframes`
from { width: 0 }
to { width: 100% }
`;

  const typingCaret = keyframes`
from { border-right-color: black }
to { border-right-color: transparent }
`;


  if (!tutor) {
    return <Variants />;
  }

  return (
    <Grid container sm={11.5} sx={{ height: "100vh" }}>
      <Grid item sm={12}>
        <Box
          display="flex"
          alignItems="flex-start"
          p={2}
          ml={6}
          sx={{
            overflow: "hidden", // Ensures that the typing effect stays within the box
            whiteSpace: "nowrap", // Prevents text wrapping
            borderRight: "2px solid", // Creates the caret
            animation: `
           ${typing} 4s steps(30, end) 0s forwards,
          ${typingCaret} -1s 1s forwards
        `, // Apply the typing and caret disappearance animations
            width: "fit-content",
          }}
        >
          <Typography variant="h4" fontWeight="bold" sx={{ color: "darkblue" }}>
            {`Hi, ${tutor.firstName} ${tutor.lastName}!!`}
          </Typography>
          <span
            role="img"
            aria-label="smile"
            style={{ marginLeft: 8, fontSize: "2em" }}
          >
            👋👋
          </span>
        </Box>
      </Grid>

      <Grid item sm={5} display={"flex"} justifyContent={"center"}>
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            width: "70%",
            height: 500,
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.01)",
            },
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            flexDirection={"column"}
            alignItems={"center"}
            my={5}
          >
            {tutor.profileUrl ? (
              <img
                alt="profile-user"
                width="150px"
                height="150px"
                src={tutor.profileUrl}
                style={{
                  cursor: "pointer",
                  borderRadius: "50%",
                  border: "3px solid black",
                }}
              />
            ) : (
              <Avatar
                alt="default-avatar"
                sx={{
                  width: 150,
                  height: 150,
                  cursor: "pointer",
                  border: "3px solid black",
                }}
              ></Avatar>
            )}

            <Rating
              name="read-only"
              value={tutor.rating}
              readOnly
              sx={{
                fontSize: 28,
                my: 2,
              }}
            />
          </Box>

          <CardContent>
            <Box display="flex" alignItems="center">
              <PersonIcon sx={{ fontSize: 28, color: "darkblue" }} />
              <Typography
                variant="body1"
                sx={{ marginLeft: 1, color: "darkblue" }}
              >
                Tutor
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ marginTop: 3 }}>
              <EmailIcon sx={{ fontSize: 28, color: "darkblue" }} />
              <Typography
                variant="body1"
                sx={{ marginLeft: 1, color: "darkblue" }}
              >
                {tutor.universityMail}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ marginTop: 3 }}>
              <CallIcon sx={{ fontSize: 28, color: "darkblue" }} />
              <Typography
                variant="body1"
                sx={{ marginLeft: 1, color: "darkblue" }}
              >
                {tutor.phoneNumber}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid
        item
        container
        sm={7}
        sx={{ display: "flex", alignItems: "space-around" }}
      >
        <Grid item sm={4}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              width: 230,
              height: 120,
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.01)",
              },
            }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                borderBottom: `2px solid ${darkblue[200]}`,
              }}
            >
              <CardHeader
                subheader={
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ color: "darkblue" }}
                  >
                    Current Students
                  </Typography>
                }
              />
            </Box>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <LocalLibraryIcon sx={{ color: "Darkblue", fontSize: 30 }} />
              <Typography sx={{ color: "Darkblue", fontSize: 25 }}>
                {mySubjectsCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item sm={4}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              width: 230,
              height: 120,
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.01)",
              },
            }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                borderBottom: `2px solid ${darkblue[200]}`,
              }}
            >
              <CardHeader
                subheader={
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ color: "darkblue" }}
                  >
                    Requests
                  </Typography>
                }
              />
            </Box>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <CallReceivedSharpIcon sx={{ color: "green", fontSize: 30 }} />
              <Typography sx={{ color: "Darkblue", fontSize: 25 }}>
                {acceptedRequestsCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item sm={4}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              width: 230,
              height: 120,
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.01)",
              },
            }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                borderBottom: `2px solid ${darkblue[200]}`,
              }}
            >
              <CardHeader
                subheader={
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ color: "darkblue" }}
                  >
                    Coins
                  </Typography>
                }
              />
            </Box>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <MonetizationOnIcon sx={{ color: "#E5B80B", fontSize: 30 }} />
              <Typography sx={{ color: "Darkblue", fontSize: 25 }}>
                {coinsCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item sm={12}>
          
          <Todotutor/>
        </Grid>
      </Grid>
    </Grid>
  );
}
