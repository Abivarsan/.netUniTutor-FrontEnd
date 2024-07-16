import React from "react";
import chat from "../img/chat.png";
import GoogleButton from "../atom/GoogleButton";
import { googleSignIn } from "../service/ChatService";

const Welcome: React.FC = () => {
  return (
    <main className="welcome">
      <h2>Welcome</h2>
      <img src={chat} alt="chat logo" width={200} height={200} />
      <p>Sign in with Google to continue chat.</p>
      <GoogleButton onClick={googleSignIn} />
    </main>
  );
};

export default Welcome;