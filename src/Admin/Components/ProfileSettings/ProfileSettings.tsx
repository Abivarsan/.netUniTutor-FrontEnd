// src/Admin/Components/ProfileSettings.tsx
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const ProfileSettings: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSaveChanges = () => {
    // Logic to save changes
    console.log('Profile settings saved', { username, email, phoneNumber });
  };

  return (
    <Box>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Phone Number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSaveChanges}>
        Save Changes
      </Button>
    </Box>
  );
};

export default ProfileSettings;
