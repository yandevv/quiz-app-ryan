import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";

import QuizzesIndex from './pages/QuizzesIndex';
import Quiz from './pages/Quiz';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuizzesIndex />} />
        <Route path="/quizzes/:quizId" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);