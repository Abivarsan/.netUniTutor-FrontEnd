// src/Admin/Components/NotificationSettings.tsx
import React, { useState } from 'react';
import { FormControlLabel, Switch, Box, Button } from '@mui/material';

const NotificationSettings: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const handleSaveChanges = () => {
    // Logic to save changes
    console.log('Notification settings saved', { emailNotifications, smsNotifications });
  };

  return (
    <Box>
      <FormControlLabel
        control={
          <Switch
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
            color="primary"
          />
        }
        label="Email Notifications"
      />
      <FormControlLabel
        control={
          <Switch
            checked={smsNotifications}
            onChange={(e) => setSmsNotifications(e.target.checked)}
            color="primary"
          />
        }
        label="SMS Notifications"
      />
      <Button variant="contained" color="primary" onClick={handleSaveChanges}>
        Save Changes
      </Button>
    </Box>
  );
};

export default NotificationSettings;
