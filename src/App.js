import React from "react";
import Login from "./Components/Login.js";
import Register from "./Components/Register.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Message from "./Components/Message.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/messages" element={<Message />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
