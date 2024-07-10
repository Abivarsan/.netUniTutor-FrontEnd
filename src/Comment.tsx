import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

interface CommentValues {
  commentText: string;
}

const initialState: CommentValues = {
  commentText: "",
};

const CommentShema = z.object({
  commentText: z.string().min(5, "Please enter a comment"),
});

export default function Comment() {

  const [isLoading, setIsLoading] = React.useState(false);
  const {
    control,
    register,
    reset,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CommentValues>({
    resolver: zodResolver(CommentShema),
    defaultValues: initialState,
  });

  const onSubmit = async (data: CommentValues) => {
    const id = localStorage.getItem("userId");
    const type=localStorage.getItem("userRole");
    try {
      setIsLoading(true);
      const response = await axios.post(`http://localhost:5025/Comment/create/${id}/${type}`, {
        commentText: data.commentText,
      });
      console.log(response.data);
      toast.success("Comment added successfully");
      reset(initialState);
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to add comment");
      console.log(error);
      setIsLoading(false);
    }
  }


  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item sm={12}>
        <Box display={"flex"} justifyContent={"center"}>
        <form onSubmit={handleSubmit(onSubmit)}>          
            <Box>
              <TextField
                id="outlined"
                label="Add Comment here..."
                multiline
                rows={5}
                {...register("commentText")}
                error={!!errors.commentText}
                helperText={errors.commentText?.message}
                sx={{
                  width: 600,
                  mt: 22,
                  bgcolor: "#E3F3FA",
                  borderRadius: 2,
                }}
              />
              <Box display={"flex"} justifyContent={"center"}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    mt: 5,
                    mb: 1,
                    width: 100,
                    color: "white",
                    backgroundColor: "#1e90ff",
                    borderRadius: "20px",
                    "&:hover": {
                      backgroundColor: "#1e90ff",
                    },
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}