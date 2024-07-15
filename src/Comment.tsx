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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { CommentResponse } from "./data/interfaces";
import moment from "moment";


interface CommentValues {
  commentText: string;

}
const initialState: CommentValues = {
  commentText: "",
};
const CommentSchema = z.object({
  commentText: z.string().min(1, "Please enter a comment"),
});


interface CommentlistProps {
  comment: CommentResponse;
}
export default function Comment() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [commentText, setCommentText] = useState<CommentResponse[]>([]);


  const [searchResults, setSearchResults] = useState<CommentResponse[]>([]);

  const [isFeching, setIsFeching] = useState<boolean>(false);

  const fetchAllComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5025/Comment/getforside`,
      );
      if (response.status === 200) {
       
        const sortedComments = response.data.sort(
          (
            a: { timestamp: string | number | Date },
            b: { timestamp: string | number | Date }
          ) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

        setCommentText(sortedComments);
        return;

       
      }
      
      toast.error("Failed to fetch subjects");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchAllComments();
  }, []);

  const {
    control,
    reset,
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CommentValues>({
    resolver: zodResolver(CommentSchema),
    defaultValues: initialState,
  });

  const onSubmit = async (data: CommentValues) => {
    const id = localStorage.getItem("userId");
    const type = localStorage.getItem("userRole");
    try {
      setIsLoading(true);
      const response = await axios.post(
       ` http://localhost:5025/Comment/create/${id}/${type}`,
        {
          commentText: data.commentText,
        }
      );
      console.log(response.data);
      // toast.success("Comment added successfully");
      reset(initialState);
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to add comment");
      console.log(error);
      setIsLoading(false);
    }
  };

  const commentList = isFeching ? searchResults : commentText;

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


      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" alignItems="center" mb={2}>
          <TextField
            variant="outlined"
            placeholder="Add a comment..."
            fullWidth
            multiline
            {...register("commentText")}
            error={!!errors.commentText}
            helperText={errors.commentText?.message}
            rows={2}
            sx={{ ml: 2 }}
          />
          <IconButton
            color="primary"
            type="submit"
            size="large"
            disabled={isLoading}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </form>
      {commentList.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          No Comments yet
        </Typography>
      ) : (
        <List>
          <Typography variant="body1" gutterBottom>
            {commentList.length} Comments
          </Typography>
          {commentList.map((comment) => (
            <ListItem key={comment._id} alignItems="flex-start">
              {comment.profileUrl ? (
                <Avatar
                  alt="profile-user"
                  src={comment.profileUrl}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <Avatar
                  alt="default-avatar"
                  sx={{
                    cursor: "pointer",
                  }}
                ></Avatar>
              )}

              <Box ml={2}>
                <Typography variant="subtitle2" sx={{ color: "darkblue" }}>
                  {comment.fullName}
                </Typography>
                <Typography variant="body2">{comment.commentText}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {moment(comment.timestamp).format("MMMM Do YYYY, h:mm A")}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}