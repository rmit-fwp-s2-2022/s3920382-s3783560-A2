import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./fragments/Navbar";
import Footer from "./fragments/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyProfile from "./pages/MyProfile";
import Forum from "./pages/Forum";
import { getUser, removeUser } from "./data/repository";

export default function App() {
  const [user, setUser] = useState(getUser());

  const loginUser = (user) => {
    setUser(user);
  };

  const logoutUser = () => {
    removeUser();
    setUser(null);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Navbar user={user} logoutUser={logoutUser} />
        <main role="main">
          <div className="container my-3">
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/login" element={<Login loginUser={loginUser} />} />
              <Route path="/register" element={<Register loginUser={loginUser} />} />
              <Route path="/profile" element={<MyProfile user={user} />} />
              <Route path="/forum" element={<Forum user={user} />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}
