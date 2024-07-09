import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

interface CommentValues {
  comment: string;
}

const initialState: CommentValues = {
  comment: "",
};

const CommentShema = z.object({
  comment: z.string().min(5, "Please enter a comment"),
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
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:5025/comments", {
        comment: data.comment,
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
                {...register("comment")}
                error={!!errors.comment}
                helperText={errors.comment?.message}
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