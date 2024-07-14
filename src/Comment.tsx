
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
  profileUrl: string;
  content: string;
  timestamp: string;
}

const Comment: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [isCommentValid, setIsCommentValid] = useState<boolean>(false);

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


  const id = localStorage.getItem("userId");
  const type = localStorage.getItem("userRole");
  // Validate comment text
  const validateComment = (comment: string) => {
    return comment.trim().length > 0;
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const commentText = e.target.value;
    setNewComment(commentText);
    setIsCommentValid(validateComment(commentText));
  };

  const handleAddComment = async () => {
    if (isCommentValid) {
      const newCommentObj: Omit<Comment, "id"> = {
        firstName: "N", // You may replace this with the actual username
        profileUrl: "https://via.placeholder.com/40",
        content: newComment,
        timestamp: "Just now",
      };


      try {
        const response = await axios.post<Comment>(
          `http://localhost:5025/Comment/create/${id}/${type}`,
          newCommentObj
        );
        setComments([response.data, ...comments]);
        setNewComment("");
        setIsCommentValid(false); // Reset validation state
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
      <Typography variant="h6" textAlign="center" sx={{ color: "darkblue" }} gutterBottom>
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
          onChange={handleCommentChange}
          multiline
          rows={1}
          sx={{ ml: 2 }}
        />
        <IconButton
          color="primary"
          onClick={handleAddComment}
          disabled={!isCommentValid}
        >
          <SendIcon />
        </IconButton>
      </Box>
      <List>
        {comments.map((comment) => (
          <ListItem key={comment.id} alignItems="flex-start">
            <Avatar src={comment.profileUrl} />
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

export default Comment;