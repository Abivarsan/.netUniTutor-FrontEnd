import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import TutorCard from "./TutorCard";

interface CardState {
  id: number;
  visible: boolean;
}

export default function Requested() {
  const [cards, setCards] = useState<CardState[]>([
    { id: 1, visible: true },
    { id: 2, visible: true },
    { id: 3, visible: true },
  ]);
  const handleCancel = (id: number) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, visible: false } : card
      )
    );
  };

  const allCardsCancelled = cards.every((card) => !card.visible);

  const dummyData = [
    {
      id: 1,
      name: "John Doe",
      description:
        "John is an experienced tutor in mathematics with over 10 years of experience.",
      rating: 4,
    },
    {
      id: 2,
      name: "Jane Smith",
      description:
        "Jane specializes in English literature and has been tutoring for 5 years.mkladfkjmndf",
      rating: 5,
    },
    {
      id: 3,
      name: "Sam Johnson",
      description:
        "Sam has a passion for teaching physics and has helped many students excel.",
      rating: 3,
    },
  ];

  return (
    <Grid container sx={{ width: "100%", height: "100%" }} spacing={4}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          minHeight: "100vh",
          padding: 2,
        }}
      >
        {allCardsCancelled ? (
          <Typography variant="h4" color="textSecondary" align="center">
            No requests yet
          </Typography>
        ) : (
          <Grid container spacing={3} justifyContent="space-evenly">
            {cards.map(
              (card) =>
                card.visible && (
                  <Grid item sm={3} key={card.id}>
                    <TutorCard
                      name={dummyData.find((data) => data.id === card.id)?.name || "Unknown"}
                      description={dummyData.find((data) => data.id === card.id)?.description || "No description"}
                      rating={dummyData.find((data) => data.id === card.id)?.rating || 0}
                      onCancel={() => handleCancel(card.id)}
                    />
                  </Grid>
                )
            )}
          </Grid>
        )}
      </Box>
    </Grid>
  );
}
