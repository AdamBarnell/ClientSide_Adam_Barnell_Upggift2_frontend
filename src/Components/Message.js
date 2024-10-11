import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Message.css";
import { Navigate, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api/messages";
//Sets a max count on the characters in the messages so it does not go over database limit
const MAXCHARACTERS = 550;

const Message = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();
  console.log("Token:", token);

  const saveMessage = async () => {
    console.log("Token being sent:", token);
    try {
      await axios.post(
        API_URL + "/message",
        { messages: message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Message saved successfully");
      fetchMessages();
    } catch (error) {
      console.error("Failed to save message", error.response);
      alert("Failed to save message");
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(API_URL + "/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch messages", error);
      if (error.response && error.response.status === 403) {
        alert(
          "Failed to fetch messages: Unauthorized. Please check your token."
        );
      } else {
        alert("Failed to fetch messages");
      }
    }
  };
  //Removing the token from the localstorage
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="message-container">
      <h2>Time Capsule Messages</h2>
      <button className="logoutBTN" onClick={handleLogout}>
        Logout
      </button>
      <form>
        <textarea
          maxLength={MAXCHARACTERS}
          className="message-form"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
        ></textarea>
        <div className="char-counter">
          {MAXCHARACTERS - message.length} characters remaining
        </div>
        <button onClick={saveMessage} disabled={message.length === 0}>
          Save Message
        </button>
      </form>
      <h3>Your Messages</h3>
      <ul className="message-list">
        {messages.map((msg, index) => (
          <li key={index}>
            <p>{msg.decryptedMessage}</p>
            <p>
              <small>{new Date(msg.createdAt).toLocaleString()}</small>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Message;
