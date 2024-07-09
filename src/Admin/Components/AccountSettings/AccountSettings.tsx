// src/Admin/Components/AccountSettings.tsx
import React from 'react';
import { Button, Box } from '@mui/material';

const AccountSettings: React.FC = () => {
  const handleDeactivateAccount = () => {
    // Logic to deactivate account
    console.log('Account deactivated');
  };

  const handleDeleteAccount = () => {
    // Logic to delete account
    console.log('Account deleted');
  };

  return (
    <Box>
      <Button variant="contained" color="secondary" onClick={handleDeactivateAccount}>
        Deactivate Account
      </Button>
      <Button
        variant="contained"
        color="error"
        style={{ marginLeft: '1rem' }}
        onClick={handleDeleteAccount}
      >
        Delete Account
      </Button>
    </Box>
  );
};

export default AccountSettings;
