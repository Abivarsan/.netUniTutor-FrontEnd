import React, { useState } from 'react';
import { Grid, Typography, Button, TextField, CircularProgress } from '@mui/material';
import axios from 'axios'; // Import axios for HTTP requests
import { toast } from 'react-toastify';
import { set } from 'date-fns';

const InviteFriend: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const InvitedById = localStorage.getItem("userId");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleInvite = async () => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
      return;
    } else {
      setEmailError('');
    }

    try {
      console.log('Sending invitation to:', email, 'from userId:', InvitedById); // Debug log
      setIsLoading(true);
      const response = await axios.post('http://localhost:5025/api/Invitation/invite', { email, InvitedById });
      console.log('Response:', response.data); // Debug log

      if (response.status === 200) {
        setEmail('');
        toast.success('Invitation sent successfully');
      } else {
        toast.error('Failed to send invitation');
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error inviting friend:', error);
      toast.error('Failed to send invitation');
      setIsLoading(false);

    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h4" align="center" sx={{ color: 'darkblue', mt: 3 }}>
          Invite Friend
        </Typography>
        <Typography variant="body1" align="center" sx={{ color: 'darkblue', mt: 3 }}>
          Enter your friend's email address to invite them.
        </Typography>
        <Grid container justifyContent="center" mt={3}>
          <Grid item xs={12}>
            <TextField
              type="email"
              placeholder="Enter friend's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
              fullWidth
              sx={{ mt: 1 }}
            />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleInvite} disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size="1rem" /> : null}>
              {isLoading ? 'Sending...' : 'Send Invitation'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InviteFriend;
