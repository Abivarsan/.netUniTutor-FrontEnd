// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   List,
//   ListItem,
//   Card,
//   CardHeader,
//   CardContent,
//   Typography,
//   IconButton,
//   ListItemText,
//   Dialog,
//   DialogTitle,
//   DialogActions,
//   Button,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";
// import axios from "axios";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "react-toastify";
// import { TodoResponse } from "../data/interfaces";

// const darkblue = {
//   100: "#C9DCF7",
//   200: "#789CFF",
//   400: "#3A66FF",
//   500: "#0044FF",
//   600: "#0037CC",
//   900: "#001B80",
// };
// interface TodoValues {
//   text: string;
// }
// const initialState: TodoValues = {
//   text: "",
// };
// const TodoSchema = z.object({
//   text: z.string().min(1, "Cannot be empty"),
// });

// interface TodolistProps {
//   todo: TodoResponse;
// }

// export default function Todotutor() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [todoText, setTodoText] = useState<TodoResponse[]>([]);
//   const [searchResults, setSearchResults] = useState<TodoResponse[]>([]);
//   const [isFeching, setIsFeching] = useState<boolean>(false);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
//   const [deleteTodoId, setDeleteTodoId] = useState<number | null>(null);

//   const fetchAllTodos = async () => {
//     try {
//       const response = await axios.get<TodoResponse[]>(
//         `http://localhost:5025/api/TodoItem/tutor/${localStorage.getItem(
//           "userId"
//         )}`
//       );
//       if (response.status === 200) {
//         setTodoText(response.data);
//         return;
//       }
//       toast.error("Failed to fetch");
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong");
//     }
//   };

//   useEffect(() => {
//     fetchAllTodos();
//   }, []);

//   const {
//     control,
//     reset,
//     watch,
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<TodoValues>({
//     resolver: zodResolver(TodoSchema),
//     defaultValues: initialState,
//   });

//   const onSubmit = async (data: TodoValues) => {
//     const id = localStorage.getItem("userId");
//     const type = localStorage.getItem("userRole");
//     try {
//       setIsLoading(true);
//       const response = await axios.post(
//         `http://localhost:5025/api/TodoItem/${type}/${id}`,
//         {
//           text: data.text,
//         }
//       );
//       console.log(response.data);
//       toast.success("Todo added successfully");
//       reset(initialState);
//       setIsLoading(false);
//       fetchAllTodos(); // Refresh the todo list after adding a new todo
//     } catch (error) {
//       toast.error("Failed to add Todo");
//       console.log(error);
//       setIsLoading(false);
//     }
//   };

 

//   const updateTodoStatus = async (todoId: number) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:5025/api/TodoItem/${todoId}`
//       );
//       if (response.status === 200) {
//         // Update the todo locally
//         const updatedTodos = todoText.map((todo) =>
//           todo._id === todoId ? { ...todo, isCompleted: true } : todo
//         );
//         setTodoText(updatedTodos);
//         // toast.success("Todo marked as completed");
//       } else {
//         toast.error("Failed to update todo");
//       }
//     } catch (error) {
//       console.error(error);
//       // toast.error("Something went wrong");
//     }
//   };

//   const deleteTodo = async (todoId: number) => {
//     try {
//       const response = await axios.delete(
//         `http://localhost:5025/api/TodoItem/${todoId}`
//       );
//       if (response.status === 204) {
//         // Remove the todo from the list locally
//         const updatedTodos = todoText.filter((todo) => todo._id !== todoId);
//         setTodoText(updatedTodos);
//         toast.success("Todo deleted successfully");
//         setDeleteDialogOpen(false);
//       } else {
//         toast.error("Failed to delete todo");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong");
//     }
//   };

//   const handleDeleteDialogOpen = (todoId: number) => {
//     setDeleteTodoId(todoId);
//     setDeleteDialogOpen(true);
//   };

//   const handleDeleteDialogClose = () => {
//     setDeleteTodoId(null);
//     setDeleteDialogOpen(false);
//   };

//   const todoList = isFeching ? searchResults : todoText;

// return (
//   <Card
//     sx={{
//       mb: 2,
//       width: "100%",
//       minHeight: 350,
//       borderRadius: 3,
//       boxShadow: 3,
//       transition: "transform 0.3s ease-in-out",
//       "&:hover": {
//         transform: "scale(1.01)",
//       },
//     }}
//   >
//     <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       sx={{
//         borderBottom: `2px solid ${darkblue[200]}`,
//       }}
//     >
//       <CardHeader
//         subheader={
//           <Typography
//             variant="subtitle1"
//             fontWeight="bold"
//             sx={{ color: "darkblue" }}
//           >
//             Todo List
//           </Typography>
//         }
//       />
//     </Box>
//     <CardContent>
//       <List>
//         {todoList.map((todo) => (
//           <ListItem key={todo._id} disablePadding>
//             <ListItemText primary={todo.text} />
//             {todo.isCompleted ? (
//               <IconButton disabled>
//                 <CheckBoxIcon sx={{ color: "lightgreen" }} />
//               </IconButton>
//             ) : (
//               <IconButton
//                 aria-label="complete"
//                 onClick={() => updateTodoStatus(todo._id)}
//               >
//                 <CheckBoxIcon />
//               </IconButton>
//             )}
//             <IconButton
//               aria-label="delete"
//               onClick={() => handleDeleteDialogOpen(todo._id)}
//             >
//               <DeleteIcon />
//             </IconButton>
//           </ListItem>
//         ))}
//       </List>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Box
//           display="flex"
//           alignItems="center"
//           justifyContent="flex-end"
//           my={4}
//         >
//           <TextField
//             variant="outlined"
//             placeholder="Add a new todo"
//             size="small"
//             fullWidth
//             {...register("text")}
//             error={!!errors.text}
//             helperText={errors.text?.message}
//           />
//           <IconButton aria-label="add todo" type="submit">
//             <AddIcon />
//           </IconButton>
//         </Box>
//       </form>
//     </CardContent>

//     {/* Delete Confirmation Dialog */}
//     <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
//       <DialogTitle>Are you sure you want to delete this todo?</DialogTitle>
//       <DialogActions>
//         <Button onClick={handleDeleteDialogClose}>Cancel</Button>
//         <Button
//           onClick={() => {
//             deleteTodo(deleteTodoId || 0);
//           }}
//           variant="contained"
//           autoFocus
//           sx={{ backgroundColor: darkblue[500], color: "white" }}
//         >
//           Delete
//         </Button>
//       </DialogActions>
//     </Dialog>
//   <import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  List,
  ListItem,
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { TodoResponse } from "../data/interfaces";
import { useEffect, useState } from "react";

const darkblue = {
  100: "#C9DCF7",
  200: "#789CFF",
  400: "#3A66FF",
  500: "#0044FF",
  600: "#0037CC",
  900: "#001B80",
};

interface TodoValues {
  text: string;
}

const initialState: TodoValues = {
  text: "",
};

const TodoSchema = z.object({
  text: z.string().min(1, "Cannot be empty"),
});

export default function TodoStudent() {
  const [isLoading, setIsLoading] = useState(false);
  const [todoText, setTodoText] = useState<TodoResponse[]>([]);
  const [searchResults, setSearchResults] = useState<TodoResponse[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [deleteTodoId, setDeleteTodoId] = useState<number | null>(null);

  const fetchAllTodos = async () => {
    try {
      const response = await axios.get<TodoResponse[]>(
        `http://localhost:5025/api/TodoItem/student/${localStorage.getItem(
          "userId"
        )}`
      );
      if (response.status === 200) {
        setTodoText(response.data);
      } else {
        toast.error("Failed to fetch");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoValues>({
    resolver: zodResolver(TodoSchema),
    defaultValues: initialState,
  });

  const onSubmit = async (data: TodoValues) => {
    const id = localStorage.getItem("userId");
    const type = localStorage.getItem("userRole");
    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://localhost:5025/api/TodoItem/${type}/${id}`,
        {
          text: data.text,
        }
      );
      toast.success("Todo added successfully");
      reset(initialState);
      setIsLoading(false);
      fetchAllTodos(); // Refresh the todo list after adding a new todo
    } catch (error) {
      toast.error("Failed to add Todo");
      console.log(error);
      setIsLoading(false);
    }
  };

  const updateTodoStatus = async (todoId: number, isCompleted: boolean) => {
    try {
      const response = await axios.put(
        `http://localhost:5025/api/TodoItem/${todoId}`,
        { isCompleted: !isCompleted } // Toggle the completed status
      );
      if (response.status === 200) {
        // Update the todo locally
        const updatedTodos = todoText.map((todo) =>
          todo._id === todoId ? { ...todo, isCompleted: !isCompleted } : todo
        );
        setTodoText(updatedTodos);
        //toast.success(`Todo ${!isCompleted ? "marked as completed" : "marked as active"}`);
      } else {
        toast.error("Failed to update todo");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const deleteTodo = async (todoId: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:5025/api/TodoItem/${todoId}`
      );
      if (response.status === 204) {
        // Remove the todo from the list locally
        const updatedTodos = todoText.filter((todo) => todo._id !== todoId);
        setTodoText(updatedTodos);
        toast.success("Todo deleted successfully");
        setDeleteDialogOpen(false);
      } else {
        toast.error("Failed to delete todo");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleDeleteDialogOpen = (todoId: number) => {
    setDeleteTodoId(todoId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteTodoId(null);
    setDeleteDialogOpen(false);
  };

  const todoList = isFetching ? searchResults : todoText;

  return (
    <Card
      sx={{
        mb: 2,
        width: "100%",
        minHeight: 350,
        borderRadius: 3,
        boxShadow: 3,
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
              Todo List
            </Typography>
          }
        />
      </Box>
      <CardContent>
        <List>
          {todoList.map((todo) => (
            <ListItem key={todo._id} disablePadding>
              <ListItemText primary={todo.text} />
              {todo.isCompleted ? (
                <IconButton
                  aria-label="complete"
                  onClick={() => updateTodoStatus(todo._id, todo.isCompleted)}
                >
                  <CheckBoxIcon sx={{ color: "lightgreen" }} />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="complete"
                  onClick={() => updateTodoStatus(todo._id, todo.isCompleted)}
                >
                  <CheckBoxIcon />
                </IconButton>
              )}
              <IconButton
                aria-label="delete"
                color="error"
                onClick={() => handleDeleteDialogOpen(todo._id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            my={4}
          >
            <TextField
              variant="outlined"
              placeholder="Add a new todo"
              size="small"
              fullWidth
              {...register("text")}
              error={!!errors.text}
              helperText={errors.text?.message}
            />
            <IconButton aria-label="add todo" type="submit">
              <AddIcon />
            </IconButton>
          </Box>
        </form>
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Are you sure you want to delete this todo?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button
            onClick={() => {
              deleteTodo(deleteTodoId || 0);
            }}
            variant="contained"
            autoFocus
            sx={{ backgroundColor: darkblue[500], color: "white" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}




