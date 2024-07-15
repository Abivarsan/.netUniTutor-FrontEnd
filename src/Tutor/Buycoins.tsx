import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  MenuItem,
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Grid,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import coingif from ".././dollar (2).gif";

const stripePromise = loadStripe(
  "pk_test_51PZbYsRu7eJS4wlDs5SYvyMmHA8VrCdbXVxwZ8arKMAyryeRBUT2y5XjVAD5rx5943ugtVHPwq3VhiWgZ6vUnfYR00cyPD8BK9"
); // Replace with your Stripe publishable key

const BuyCoins: React.FC = () => {
  const [coins, setCoins] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const TutorId = localStorage.getItem("userId"); // Retrieve TutorId from local storage

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://localhost:5025/api/Payment/create-checkout-session/${TutorId}`,
        {
          coins,
          description,
        }
      );
      const { sessionId } = response.data;

      // Check session status
      const statusResponse = await axios.get(

        `http://localhost:5025/api/Payment/checkout-session-status/${sessionId}`
      );
      const { status } = statusResponse.data;

      if (status === "open") {
        const stripe = await stripePromise;
        if (stripe) {
          stripe.redirectToCheckout({ sessionId: sessionId });
        }
      } else {
        console.error("Checkout session is not open:", status);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  const calculateLkrAmount = (coins: number) => {
    return coins * 20; // 1 coin = 100 LKR
  };

  return (
    <Grid container spacing={3} alignItems="flex-start" justifyContent="center">
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography variant="h4" sx={{ color: "darkblue" }}>
            How many coins do you want?
          </Typography>

        </Box>
        <Box my={15}>
          <img src={coingif} alt="dollar" style={{ width: "60%" }} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={5}>
        <Box
          textAlign="center"
          my={3}

          sx={{
            bgcolor: "#f0f0f0",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            borderRadius: "10px",
            p: 3,
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              select
              sx={{ mt: 3 }}
              id="coin-amount"
              fullWidth
              label="Coins"
              value={coins}
              onChange={(e) => setCoins(Number(e.target.value))}
            >
              <MenuItem value={50}>50 coins</MenuItem>
              <MenuItem value={100}>100 coins</MenuItem>
              <MenuItem value={150}>150 coins</MenuItem>
            </TextField>

            <Box display="flex" justifyContent="center" alignItems="center">
              <Card
                sx={{
                  width: 450,
                  height: 100,
                  mt: 3,
                  backgroundColor: "#f0f0f0",
                  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                }}
              >
                <CardHeader subheader="Amount " />
                <CardContent>
                  <Typography variant="h6" sx={{ fontSize: "15px" }}>
                    {calculateLkrAmount(coins).toFixed(2)} LKR
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            <Box>
              <TextField
                size="small"
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                sx={{ my: 2 }}
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              color="primary"
              startIcon={<PaymentIcon />}
              size="large"
              sx={{ width: 300, mt: 4 }}
            >
              Get {coins} coins
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>

  );
};

export default BuyCoins;
