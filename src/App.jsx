import React, { useState, useCallback, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import Homie from './homie/Homie';
import AllPosts from './homie/components/AllPosts';
import OnePost from "./homie/components/OnePost"
import Blog from './blog/Blog';



function App() {




  return (
    <>

      <Routes>

        < Route path="/" element={<Homie />} />
        < Route path="/blog" element={<Blog />} />
        < Route path="/blog/:slug" element={<OnePost />} />
      </Routes>

    </>
  )
}

export default App;
