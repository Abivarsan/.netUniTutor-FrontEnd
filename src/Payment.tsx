// import React, { useCallback, useState, useEffect } from "react";
// import {loadStripe} from '@stripe/stripe-js';
// import {
//   EmbeddedCheckoutProvider,
//   EmbeddedCheckout
// } from '@stripe/react-stripe-js';
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate
// } from "react-router-dom";

// // Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the `Stripe` object on every render.
// // This is your test secret API key.

// const stripePromise = loadStripe('pk_test_51PZbYsRu7eJS4wlDs5SYvyMmHA8VrCdbXVxwZ8arKMAyryeRBUT2y5XjVAD5rx5943ugtVHPwq3VhiWgZ6vUnfYR00cyPD8BK9');
// const TutorId = localStorage.getItem("userId");
// export default function CheckoutForm() {
//   const fetchClientSecret = useCallback(() => {
//     // Create a Checkout Session
//     return fetch(`http://localhost:5025/api/Payment/create-checkout-session/${TutorId}`, {
//       method: "POST",
//     })
//       .then((res) => res.json())
//       .then((data) => data.clientSecret);
//   }, []);

//   const options = {fetchClientSecret};

//   return (
//     <div id="checkout">
//       <EmbeddedCheckoutProvider
//         stripe={stripePromise}
//         options={options}
//       >
//         <EmbeddedCheckout />
//       </EmbeddedCheckoutProvider>
//     </div>
//   )
// }

// const Return = () => {
//   const [status, setStatus] = useState(null);
//   const [customerEmail, setCustomerEmail] = useState('');

//   useEffect(() => {
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     const sessionId = urlParams.get('session_id');

//     fetch(`/session-status?session_id=${sessionId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setStatus(data.status);
//         setCustomerEmail(data.customer_email);
//       });
//   }, []);

//   if (status === 'open') {
//     return (
//       <Navigate to="    checkout" />
//     )
//   }

//   if (status === 'complete') {
//     return (
//       <section id="success">
//         <p>
//           We appreciate your business! A confirmation email will be sent to {customerEmail}.

//           If you have any questions, please email <a href="mailto:">UniTutor@gmail.com</a>.
//         </p>
//       </section>
//     )
//   }

//   return null;
// }

import React, { useState } from 'react';
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
} from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

// Load Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51PZbYsRu7eJS4wlDs5SYvyMmHA8VrCdbXVxwZ8arKMAyryeRBUT2y5XjVAD5rx5943ugtVHPwq3VhiWgZ6vUnfYR00cyPD8BK9'); // Replace with your Stripe publishable key

const CheckoutForm: React.FC = () => {
  const [coins, setCoins] = useState<number>(0);
  const [description, setDescription] = useState<string>('');

  const TutorId = localStorage.getItem("userId"); // Retrieve TutorId from local storage

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5025/api/Payment/create-checkout-session/${TutorId}`, {
        coins,
        description
      });
      const { sessionId } = response.data;

      const stripe = await stripePromise;
      if (stripe) {
        stripe.redirectToCheckout({ sessionId: sessionId });
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  const calculateLkrAmount = (coins: number) => {
    return coins * 100; // 1 coin = 100 LKR
  };

  return (
    <Container>
      <Box textAlign="center" my={3} width={850}>
        <Typography variant="h4" sx={{ color: 'darkblue' }}>
          How many coins do you want?
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            select
            sx={{ width: 400, mt: 3 }}
            id="coin-amount"
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
                width: 400,
                height: 100,
                mt: 3,
                backgroundColor: '#f0f0f0',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              }}
            >
              <CardHeader subheader="Amount " />
              <CardContent>
                <Typography variant="h6" sx={{ fontSize: '15px' }}>
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
              sx={{ my: 2, width: 400 }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<PaymentIcon />}
            size="large"
            sx={{ width: 300, mt: 4 }}
          >
            Get {coins} coins
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CheckoutForm;
