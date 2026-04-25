import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";

// Components Imports
import QuizzesIndex from './pages/QuizzesIndex';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuizzesIndex />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)