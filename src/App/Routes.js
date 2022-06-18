import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from './Components/Error';
import Homepage from './Components/Homepage';
import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import UserProfile from './Components/UserProfile';
import SignUp from './Components/Signup';
import { useAuth } from "./Contexts/AuthContext";

export default function Routing() {
  const { currentUser } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} >
          <Route index element={<Homepage />} />
          <Route path="user/:userId" element={<Profile />} />
          <Route path="claim" element={<UserProfile />} />
          <Route path="*" element={<NotFound />} />
          {currentUser === null &&
            <Route path="signup" element={<SignUp />} />
          }
        </Route>
      </Routes>
    </BrowserRouter>
  )
}