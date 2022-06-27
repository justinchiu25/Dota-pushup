import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from './Components/Error';
import Homepage from './Components/Homepage';
import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import UserProfile from './Components/UserProfile';
import SignUp from './Components/Signup';
import Login from './Components/Login';
import Leaderboard from './Components/Leaderboard/Leaderboard';
import { useAuth } from "./Contexts/AuthContext";

export default function Routing() {
  const { currentUser } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Navbar />} >
          <Route index element={<Homepage />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="user/:userId" element={<Profile />} />
          <Route path="*" element={<NotFound />} /> 
        </Route>
      {currentUser !== null ? (
        <Route path="/" element={<Navbar />} >
          <Route index element={<Homepage />} />
          <Route path="claim" element={<UserProfile />} />
        </Route> )
        : (
          <Route path="/" element={<Navbar />} >
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login /> } />
          </Route>
        )
      }
      </Routes>
    </BrowserRouter>
  )
}