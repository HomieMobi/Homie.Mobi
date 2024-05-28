import React from 'react';
import { Route, Routes } from "react-router-dom";
import Homie from './homie/Homie';
import AllPosts from './homie/components/AllPosts';
import OnePost from "./homie/components/OnePost";
import Blog from './blog/Blog';
import { AuthProvider } from "./contexts/authContext";
import Login from './components2/login';
import Register from './components2/register';
import PrivateRoute from './PrivateRoute';
import Bonus from './Bonus';



function App() {
  return (
    <AuthProvider>

      <Routes>
        <Route path="/" element={<Homie />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<OnePost />} />
        <Route path="/bonus" element={<Bonus />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
