import React, { useState } from "react";
import { auth1, db1 } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Box, Button, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

interface SendMessageProps {
  scroll: React.RefObject<HTMLSpanElement>;
  recipientId: string;
}

const SendMessage: React.FC<SendMessageProps> = ({ scroll, recipientId }) => {
  const [message, setMessage] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);

  const sendMessage = async () => {
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    setDisabled(true);
    const { uid, displayName, photoURL } = auth1.currentUser!;
    try {
      await addDoc(collection(db1, "messages"), {
        recipientId,
        text: message,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid,
      });
      setMessage("");
      scroll.current!.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setDisabled(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission on Enter press
      sendMessage();
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        label="Give a message"
        variant="outlined"
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{ marginRight: 2 }}
        disabled={disabled}
      />
      <Button
        disabled={disabled}
        variant="contained"
        color="primary"
        onClick={sendMessage}
        endIcon={<SendIcon />}
      >
        Send
      </Button>
    </Box>
  );
};

export default SendMessage;
