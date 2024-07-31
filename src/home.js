import React from "react";
import './App.css';
import Quiz from './Quiz';

import {Link} from "react-router-dom";


function Home() {

  
  
  return (
    <div className='home'>
      <div className='design-top1'></div>
      <div className='home-data'>
        <h1 className='quiz-name'>Mind Battle</h1>
        <p className='description'>Embark on a journey of knowledge exploration with our Extensive collection of interactive Quizzes</p>
        <Link to="/Quiz">
        <button 
          className='start-button' 
          >
            Start Quiz
          </button>
        </Link>
         
      </div>
      <div className='design-bottom1'></div>
    </div>
    
  )
}

export default Home;
