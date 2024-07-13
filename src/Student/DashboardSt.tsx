import React, { useEffect, useState } from "react";
import axios from "axios";
import { keyframes } from '@emotion/react';
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
} from "@mui/material";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import BlockIcon from '@mui/icons-material/Block';
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Variants from "../components/common/sketlan";

const darkblue = {
  100: "#C9DCF7",
  200: "#789CFF",
  400: "#3A66FF",
  500: "#0044FF",
  600: "#0037CC",
  900: "#001B80",
};

interface Student {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileUrl: string;
}

interface TodoItem {
  _id: number;
  text: string;
  isCompleted: boolean;
}

const typing = keyframes`
from { width: 0 }
to { width: 100% }
`;

const typingCaret = keyframes`
from { border-right-color: black }
to { border-right-color: transparent }
`;

export default function DashboardSt() {
  const [mySubjectsCount, setMySubjectsCount] = useState<number>(0);
  const [acceptedRequestsCount, setAcceptedRequestsCount] = useState<number>(0);
  const [rejectedRequestsCount, setRejectedRequestsCount] = useState<number>(0);
  const [student, setStudent] = useState<Student | null>(null);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [todoInput, setTodoInput] = useState<string>('');

  const studentId = localStorage.getItem("userId");
  const type = localStorage.getItem("userRole");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching student details...");
        const studentResponse = await axios.get<Student>(`http://localhost:5025/api/Student/details/${studentId}`);
        console.log("Student details:", studentResponse.data);
        setStudent(studentResponse.data);

        console.log("Fetching my subjects count...");
        const mySubjectsResponse = await axios.get<number>(`http://localhost:5025/api/Request/${studentId}/acceptedrequestscount`);
        console.log("My subjects count:", mySubjectsResponse.data);
        setMySubjectsCount(mySubjectsResponse.data);

        console.log("Fetching accepted requests count...");
        const acceptedRequestsResponse = await axios.get<number>(`http://localhost:5025/api/Request/${studentId}/mypendingsubjectscount`);
        console.log("Accepted requests count:", acceptedRequestsResponse.data);
        setAcceptedRequestsCount(acceptedRequestsResponse.data);

        console.log("Fetching rejected requests count...");
        const rejectedRequestsResponse = await axios.get<number>(`http://localhost:5025/api/SubjectRequests/${studentId}/rejectedrequestscount`);
        console.log("Rejected requests count:", rejectedRequestsResponse.data);
        setRejectedRequestsCount(rejectedRequestsResponse.data);

        console.log("Fetching todo items...");
        const todosResponse = await axios.get<TodoItem[]>(`http://localhost:5025/api/TodoItem/student/${studentId}`);
        console.log("Todo items:", todosResponse.data);
        setTodos(todosResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (studentId) {
      fetchData();
    }
  }, [studentId]);

  const handleAddTodo = async () => {
    try {
      if (todoInput.trim() !== '') {
        const todoResponse = await axios.post<TodoItem>(`http://localhost:5025/api/TodoItem/${type}/${studentId}`, { text: todoInput });
        setTodos([...todos, todoResponse.data]);
        console.log("Todo added:", todoResponse.data);

        setTodoInput('');
      }
    } catch (error) {
      console.error("Error adding todo", error);
    }
  };

  const handleRemoveTodo = async (index: number) => {
    try {
      await axios.delete(`http://localhost:5025/api/TodoItem/${todos[index]._id}`);
      const updatedTodos = [...todos];
      updatedTodos.splice(index, 1);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  const handleCompleteTodo = async (index: number) => {
    try {
      const updatedTodo = { ...todos[index], isCompleted: true };
      await axios.put(`http://localhost:5025/api/TodoItem/${todos[index]._id}`, updatedTodo);
      const updatedTodos = todos.map((todo, idx) =>
        idx === index ? updatedTodo : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error completing todo", error);
    }
  };

  if (!student) {
    return <div><Variants /></div>;
  }

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item sm={5}>
        <Box display="flex" alignItems="flex-start" p={2} ml={6} sx={{
          overflow: 'hidden', // Ensures that the typing effect stays within the box
          whiteSpace: 'nowrap', // Prevents text wrapping
          borderRight: '2px solid', // Creates the caret
          animation: `
          ${typing} 4s steps(30, end) 1s forwards, 
          ${typingCaret} 0s 4s forwards
        `, // Apply the typing and caret disappearance animations
          width: 'fit-content',
        }}>
          <Typography variant="h4" fontWeight="bold" sx={{ color: "darkblue" }}>
            {`Hi, ${student.firstName} ${student.lastName}!!`}
          </Typography>
          <span role="img" aria-label="smile" style={{ marginLeft: 8, fontSize: '2em' }}>
            👋👋
          </span>
        </Box>
        <Box ml={6} p={2}>
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
              justifyContent="flex-start"
              ml={14}
              my={5}

            >
              <Box display="flex">
                {student.profileUrl ? (
                  <img
                    alt="profile-user"
                    width="150px"
                    height="150px"
                    src={student.profileUrl}
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
                  >

                  </Avatar>
                )}
              </Box>

            </Box>

            <CardContent>
              <Box display="flex" alignItems="center">
                < PersonIcon sx={{ fontSize: 28, color: "darkblue" }} />
                <Typography variant="body1" sx={{ marginLeft: 1, color: "darkblue" }}>
                  Student
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" sx={{ marginTop: 3 }}>
                <EmailIcon sx={{ fontSize: 28, color: "darkblue" }} />
                <Typography variant="body1" sx={{ marginLeft: 1, color: "darkblue" }}>
                  {student.email}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" sx={{ marginTop: 3 }}>
                <CallIcon sx={{ fontSize: 28, color: "darkblue" }} />
                <Typography variant="body1" sx={{ marginLeft: 1, color: "darkblue" }}>
                  {student.phoneNumber}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Grid>
      <Grid
        item
        sm={7}
        container
        sx={{ mt: 12, display: "flex", justifyContent: "space-around" }}
      >
        <Grid item>
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
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "darkblue" }}>
                    Current Subjects
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

        <Grid item>
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
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "darkblue" }}>
                    Requested
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
              <ArrowOutwardIcon sx={{ color: "green", fontSize: 30 }} />
              <Typography sx={{ color: "Darkblue", fontSize: 25 }}>
                {acceptedRequestsCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item>
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
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "darkblue" }}>
                    Rejected
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
              <BlockIcon sx={{ color: "red", fontSize: 30 }} />
              <Typography sx={{ color: "Darkblue", fontSize: 25 }}>
                {rejectedRequestsCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Box mb={9}>
          <Grid item>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                width: 800,
                height: 300,
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
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "darkblue" }}>
                      Todo List
                    </Typography>
                  }
                />
              </Box>
              <CardContent>
                <List>
                  {todos.map((todo, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemText primary={todo.text} />
                      {!todo.isCompleted ? (
                        <IconButton aria-label="complete" onClick={() => handleCompleteTodo(index)}>
                          <CheckBoxIcon />
                        </IconButton>
                      ) : null}
                      <IconButton aria-label="delete" onClick={() => handleRemoveTodo(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
                <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
                  <TextField
                    variant="outlined"
                    placeholder="Add a new todo"
                    size="small"
                    value={todoInput}
                    onChange={(e) => setTodoInput(e.target.value)}
                    sx={{ mr: 1, width: 800 }}
                  />
                  <IconButton aria-label="add todo" onClick={handleAddTodo}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Box>


      </Grid>

    </Grid>
  );
}