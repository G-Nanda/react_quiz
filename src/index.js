import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Quiz from './Quiz';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
  
);
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Router>
//     <Routes>
//       <Route index element={App} />
//       <Route path="/quiz" element={Quiz} />
//     </Routes>
//   </Router>
  
// );


