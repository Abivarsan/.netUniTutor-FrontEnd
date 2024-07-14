// import React, { useState, ChangeEvent, FormEvent } from "react";
// import { Box, Button, Grid, IconButton, TextField } from "@mui/material";
// import axios from "axios";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "react-toastify";
// import { Send } from "@mui/icons-material";
// import SendIcon from "@mui/icons-material/Send";

// interface CommentValues {
//   commentText: string;
// }

// const initialState: CommentValues = {
//   commentText: "",
// };

// const CommentShema = z.object({
//   commentText: z.string().min(5, "Please enter a comment"),
// });

// export default function Comment() {
//   const [isLoading, setIsLoading] = React.useState(false);
//   const {
//     control,
//     register,
//     reset,
//     watch,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<CommentValues>({
//     resolver: zodResolver(CommentShema),
//     defaultValues: initialState,
//   });

//   const onSubmit = async (data: CommentValues) => {
//     const id = localStorage.getItem("userId");
//     const type = localStorage.getItem("userRole");
//     try {
//       setIsLoading(true);
//       const response = await axios.post(
//         `http://localhost:5025/Comment/create/${id}/${type}`,
//         {
//           commentText: data.commentText,
//         }
//       );
//       console.log(response.data);
//       toast.success("Comment added successfully");
//       reset(initialState);
//       setIsLoading(false);
//     } catch (error) {
//       toast.error("Failed to add comment");
//       console.log(error);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Grid container sx={{ height: "auto" }}>
//       <Grid item sm={12}>
//         <Box  sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "165vh",
//         }}>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Box>
//               <TextField
//                 id="outlined"
//                 label="Add Comment here..."
//                 multiline
//                 rows={2}
//                 {...register("commentText")}
//                 error={!!errors.commentText}
//                 helperText={errors.commentText?.message}
//                 sx={{
//                   bgcolor: "#ffffff",
//                   border: "1px solid #ccc",
//                   borderRadius: 2,
//                 }}
//               />

//                 <IconButton
//                   type="submit"
//                   disabled={isLoading}
//                   sx={{
//                   mt:2,
//                     mb: 1,
//                     color: "white",
//                     backgroundColor: "#1e90ff",
//                     borderRadius: "50%",
//                     "&:hover": {
//                       backgroundColor: "#1e90ff",
//                     },
//                   }}
//                 >
//                   <SendIcon />
//                 </IconButton>

//             </Box>
//           </form>
//         </Box>
//       </Grid>
//     </Grid>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  List,
  ListItem,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

interface Comment {
  id: number;
  firstName: string;
  profileUr: string;
  content: string;
  timestamp: string;
}

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    // Fetch comments from the backend
    const fetchComments = async () => {
      try {
        const response = await axios.get<Comment[]>(
          "https://your-backend-url/api/comments"
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const newCommentObj: Omit<Comment, "id"> = {
        firstName: "N", // You may replace this with the actual username
        profileUr: "https://via.placeholder.com/40",
        content: newComment,
        timestamp: "Just now",
      };

      try {
        const response = await axios.post<Comment>(
          "https://your-backend-url/api/comments",
          newCommentObj
        );
        setComments([response.data, ...comments]);
        setNewComment("");
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    }
  };

  return (
    <Box
      width="75%"
      mx="auto"
      mt={10}
      sx={{
        bgcolor: "white",
        p: 3,
        borderRadius: 4,
        boxShadow: 1,
      }}
    >
      <Typography variant="h6" textAlign={'center'} sx={{color:"darkblue"}} gutterBottom>
        We appreciate your feedback! Share your comments and suggestions about
        UniTutor. Your input helps us improve and provide better content.
      </Typography>

      <Typography variant="body1" gutterBottom>
        {comments.length} Comments
      </Typography>
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar src="https://via.placeholder.com/40" />
        <TextField
          variant="outlined"
          placeholder="Add a comment..."
          fullWidth
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          multiline
          rows={1}
          sx={{ ml: 2 }}
        />
        <IconButton
          color="primary"
          onClick={handleAddComment}
          disabled={!newComment.trim()}
        >
          <SendIcon />
        </IconButton>
      </Box>
      <List>
        {comments.map((comment) => (
          <ListItem key={comment.id} alignItems="flex-start">
            <Avatar src={comment.profileUr} />
            <Box ml={2}>
              <Typography variant="subtitle2" sx={{ color: "darkblue" }}>
                {comment.firstName}
              </Typography>
              <Typography variant="body2">{comment.content}</Typography>
              <Typography variant="caption" color="textSecondary">
                {comment.timestamp}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CommentSection;
