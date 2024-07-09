// src/Admin/Pages/SettingsPage/SettingsPage.tsx
import React from 'react';
import { Container, Typography, Tabs, Tab, Box, Paper } from '@mui/material';
import ProfileSettings from '../../Components/ProfileSettings//ProfileSettings';
import NotificationSettings from '../../Components/NotificationSettings//NotificationSettings';
import AccountSettings from '../../Components/AccountSettings/AccountSettings';
import './SettingsPage.scss';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const SettingsPage: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container className="settingsPage">
      <Typography variant="h5" gutterBottom >
       <h1>Settings</h1> 
      </Typography>
      <Paper elevation={3}>
        <Tabs value={value} onChange={handleChange} aria-label="settings tabs">
          <Tab label="Profile" />
          <Tab label="Notifications" />
          <Tab label="Account" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <ProfileSettings />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <NotificationSettings />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AccountSettings />
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default SettingsPage;
