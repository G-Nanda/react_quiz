import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import Quiz from './Quiz';

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  </Router>
  )
}

export default App