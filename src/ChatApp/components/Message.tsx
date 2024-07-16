import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar } from "@mui/material";
import { format } from "date-fns";
import { auth1 } from "../../firebase";

interface MessageProps {
  index: number;
  message: {
    uid: string;
    avatar: string;
    name: string;
    text: string;
    createdAt: {
      seconds: number;
    }|null;
  };
  [key: string]: any;
}

const Message: React.FC<MessageProps> = (props) => {
  const [user] = useAuthState(auth1);
  const {message}=props
  const isCurrentUser = message.uid === user?.uid;
  function formatTimeAgo(dateInSec: number): string {
    const now = new Date();
    const createdAtDate = new Date(dateInSec * 1000); 
    const diff = now.getTime() - createdAtDate.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
  
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }
  }

  function formatTime(createdAt: number ): string {
    const createdAtDate = new Date(createdAt * 1000); // Convert seconds to milliseconds
    // Determine the format based on the date comparison
    let dateFormat = "hh:mm a";  
    return format(createdAtDate, dateFormat); // Return formatted time string
  }
  
  return (
      <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${isCurrentUser ? "me":"other"}`}
      >
        <div className="chat__item__content">
          <div className="chat__msg">{message.text}</div>
          <div className="chat__meta">
            <span>{message.createdAt?formatTimeAgo(message.createdAt.seconds):''}</span>
            <span>{message.createdAt?formatTime(message.createdAt.seconds):''}</span>
          </div>
        </div>
        <Avatar 
          src={message.avatar} 
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            ...(isCurrentUser
              ? { marginLeft: 1.5 , marginRight:0.5}
              : { marginRight: 1.5, marginLeft: 0.5 })
        }}
        />
      </div>
  );
};

export default Message;
