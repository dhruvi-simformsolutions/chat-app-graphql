import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Register from "./pages/Register";
import {AuthProvider} from "./context/auth";
import Chat from "./pages/Chat"
function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Routes>
            <Route exact path="/" element={<Login />}/>
            <Route exact path="/list" element={<Home />}/>
            <Route exact path="/login" element={<Login />}/>
            <Route exact path="/register" element={<Register />}/>
            <Route exact path="/chat" element={<Chat />}/>
          </Routes>
          </Container>
      </Router>
     </AuthProvider>
  );
}

export default App;
