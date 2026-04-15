import React, { useState } from "react";
import SchemeChecker from "./SchemeChecker";

import Chatbot from "react-chatbot-kit";
import config from "./chatbot/config";
import ActionProvider from "./chatbot/ActionProvider";
import MessageParser from "./chatbot/MessageParser";

import { FaComments } from "react-icons/fa";

import "react-chatbot-kit/build/main.css";

function App() {

  const [openChat, setOpenChat] = useState(false);

  return (
    <div>

      <SchemeChecker />

      {/* Chat Icon */}
      <div
        style={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
          background: "#ff7e5f",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
        }}
        onClick={() => setOpenChat(!openChat)}
      >
        <FaComments />
      </div>

      {/* Chat Window */}
      {openChat && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "25px",
            width: "320px"
          }}
        >
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}

    </div>
  );
}

export default App;