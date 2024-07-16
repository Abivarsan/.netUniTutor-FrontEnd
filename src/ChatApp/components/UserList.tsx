import React, { useState, useEffect } from 'react';
import ChatBox from "./ChatBox";
import { Paper, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from '@mui/material';
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db1 } from "../../firebase";

interface User {
  uid: string;
  name: string;
  email: string;
  avatar: string;
  // Add more properties if necessary
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]); // Define User type for users state
  const [recipientUser, setRecipientUser] = useState<User | null>(null); // Define User type for recipientUser state
  const user = getAuth().currentUser;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      if (!recipientUser) {
        const q = query(collection(db1, "users"), where("uid", "!=", user?.uid)); // Add null check for user
        const docs = (await getDocs(q)).docs;
        const usersList = docs.map(doc => doc.data() as User); // Cast to User type
        setUsers(usersList);
      }
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  };

  return (
    <>
      {recipientUser ?
        <ChatBox recipUser={recipientUser} /> :
        <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto', marginTop: 5 }}>
          <Typography variant="h5" gutterBottom>
            Choose Chat Partner
          </Typography>
          <List>
            {users.map(recipient => (
              <ListItem key={recipient.uid} button
                onClick={() => setRecipientUser(recipient)}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f0f0f0', // Background color on hover
                    cursor: 'pointer', // Change cursor to pointer on hover
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#e0e0e0', // Background color when selected
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar src={recipient.avatar}>
                    {recipient.name ? recipient.name.charAt(0).toUpperCase() : ''}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography component="span" variant="body1" sx={{ fontSize: 16, fontWeight: 'bold', marginRight: 1 }}>
                      {recipient.name}
                    </Typography>}
                  secondary={
                    <Typography component="span" variant="body2">
                      ({recipient.email})
                    </Typography>
                  }
                  sx={{ whiteSpace: 'pre-line' }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>}
    </>
  );
}

export default UserList;
