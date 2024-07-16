import React, { useEffect, useRef, useState } from "react";
import { query, collection, onSnapshot, where } from "firebase/firestore";
import { db1 } from "../../firebase";
import Message from "../components/Message";
import SendMessage from "../components/SendMessage";
import { Avatar, Box, Button, List, Paper, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import MenuOpenTwoToneIcon from '@mui/icons-material/MenuOpenTwoTone';

// Define interfaces for props and state
interface RecipientUser {
  uid: string;
  name: string;
  email: string;
  avatar: string;
}


interface MessageObj{
    uid: string;
    avatar: string;
    name: string;
    text: string;
    createdAt: {
      seconds: number;
    };
    
  [key: string]: any;
}


interface ChatBoxProps {
  recipUser: RecipientUser;
}

const ChatBox: React.FC<ChatBoxProps> = ({ recipUser }) => {
  const [messages, setMessages] = useState<MessageObj[]>([]);
  const [recipientUser, setRecipientUser] = useState<RecipientUser>(recipUser);
  const scroll = useRef<HTMLDivElement>(null); 
  const user = getAuth().currentUser;
  
  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const init = async () => {
    setRecipientUser(recipUser);
    const userid = user?.uid;
    const recipid = recipUser.uid;

    const q = query(
      collection(db1, "messages"),
      where('uid', 'in', [userid, recipid])
    );

    await onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages: any[] = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });

      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );

      if (sortedMessages) {
        const userlist = sortedMessages.filter(
          (msg) =>
            (msg.recipientId === userid && msg.uid === recipid) ||
            (msg.recipientId === recipid && msg.uid === userid)
        );
        setMessages(userlist);
      }
    });
  };

  const navigateToHome = () => {
    window.location.href = '/';
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto', marginTop: 2, backgroundColor: '#f1f1f1' }}>
      <Typography variant="h5" gutterBottom  sx={{display:"flex" ,justifyContent:"space-between" , alignItems: "center"}}>
       <div className="blocks">
            <div className="current-chatting-user">
              <Avatar
                src={recipientUser.avatar}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  marginRight: 2, // Adjusted from 20px to 2 to match the new styling
                }}
              />
              <p>{recipientUser.name || '...'}</p>
            </div>
        </div>
          <Button
            variant="outlined"
            color="primary"
            onClick={navigateToHome}
            endIcon={<MenuOpenTwoToneIcon sx={{
              width: 30,
              height: 30}}/>}
            title="Switch User"
        ></Button>
      </Typography>
      <Box sx={{ maxHeight: '480px', overflowY: 'auto', marginBottom: 2 }}>
        <List>
          {messages.map((msg, index) => (
            <Message key={msg.id} index={index} message={msg} />
          ))}
          <div ref={scroll}></div>
        </List>
      </Box>
      <SendMessage scroll={scroll} recipientId={recipientUser.uid} />
    </Paper>
  );
};

export default ChatBox;
