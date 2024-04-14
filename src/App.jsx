import React, { useState, useCallback, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";

import Homie from './homie/Homie';
import Blog from './blog/Blog'


function App() {




  return (
    <>

      <Routes>

        < Route path="/" element={<Homie />} />
        < Route path="/blog" element={<Blog />} />
      </Routes>

    </>
  )
}

export default App;
