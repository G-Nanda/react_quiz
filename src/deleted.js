// import React, { useState, useEffect } from 'react';
// import Confetti from 'react-confetti';
// import './App.css';

// const Quiz = () => {
//   const [questions, setQuestions] = useState([]);
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [showResults, setShowResults] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [confetti, setConfetti] = useState(false);

//   // Function to fetch questions 
//   const fetchQuestions = async () => {
//     try {
//       const response = await fetch(
//         'https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple'
//       );
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       if (data.results) {
//         setQuestions(data.results);
//         setSelectedOptions(Array(data.results.length).fill(null));
//         setConfetti(false); // Reset confetti
//       }
//     } catch (error) {
//       setError(error);
//       console.error('Error fetching the quiz data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   const handleOptionClick = (questionIndex, option) => {
//     const newSelectedOptions = [...selectedOptions];
//     newSelectedOptions[questionIndex] = option;
//     setSelectedOptions(newSelectedOptions);
//   };

//   const checkAnswers = () => {
//     setShowResults(true);
//     const allCorrect = questions.every((q, index) => selectedOptions[index] === q.correct_answer);
//     if (allCorrect) {
//       setConfetti(true); // Trigger confetti effect
//     }
//   };

//   const resetQuiz = () => {
//     setShowResults(false);
//     setLoading(true);
//     fetchQuestions(); // Fetch new questions
//   };

//   const getOptionClass = (questionIndex, option) => {
//     if (!showResults) {
//       return selectedOptions[questionIndex] === option ? 'selected' : '';
//     }
//     if (option === questions[questionIndex].correct_answer) {
//       return 'correct';
//     }
//     if (selectedOptions[questionIndex] === option) {
//       return 'incorrect';
//     }
//     return '';
//   };

//   // Function to determine button size based on option length
//   // const getButtonStyle = (option) => {
//   //   const baseWidth = 120; // Base width
//   //   const baseHeight = 45; // Base height
//   //   const padding = 10; // Padding around text
//   //   const maxWidth = 200; // Max width

//   //   // Calculate width based on text length, up to maxWidth
//   //   const textWidth = Math.min(option.length * 10, maxWidth - padding * 2);
//   //   const width = Math.max(baseWidth, textWidth + padding * 2);
//   //   const height = baseHeight;

//   //   return { width: `${width}px`, height: `${height}px` };
//   // };

//   const decodeHtml = (html) => {
//     const txt = document.createElement('textarea');
//     txt.innerHTML = html;
//     return txt.value;
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div className='quiz'>
//       {confetti && <Confetti />}
//       <div className='design-top'></div>
//       {questions.map((q, index) => (
//         <div key={index} className='question-block'>
//           <h3 className='question'>{`Question ${index + 1}:  ${decodeHtml(q.question)}`}</h3>
//           <div className='options'>
//             {shuffleArray([...q.incorrect_answers, q.correct_answer]).map((option, i) => (
//               <button
//                 key={i}
//                 className={`optionlist ${getOptionClass(index, option)}`}
//                 onClick={() => handleOptionClick(index, option)}
//                 // style={getButtonStyle(option)} // Apply dynamic styles
//                 disabled={showResults} // Disable option buttons after showing results
//               >
//                 {/* {option} */}
//                 {decodeHtml(option)}
//               </button>
              
//             ))}
//             <br></br>
//           </div>
//           {showResults && (
//             <p className='result-message'>
//               {selectedOptions[index] === q.correct_answer ? 'Correct!' : `Wrong! The correct answer is ${decodeHtml(q.correct_answer)}.`}
//             </p>
//           )}
          
//         </div>
      
//       ))}

      
//       <button className='result' onClick={checkAnswers}>
//         Check Answers
//       </button>
      
      
//       {showResults && (
//         <button className='result' onClick={resetQuiz}>
//           Reset Quiz
//         </button>
//       )}

//     <div className='design-bottom'></div>
//     </div>
//   );
// };

// // Helper function to shuffle options
// const shuffleArray = (array) => {
//   return array.sort(() => Math.random() - 0.5);
// };

// export default Quiz;




// import React from "react";
// import {useState,useEffect} from "react";

// export default function Quiz(){
//     const [questions,setQuestions]=useState([])
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
//     .then(res=> {res.json()})

//     .then(loadedquestions=> {console.log(loadedquestions.resuts)})

//     .catch(err=>{console.error(err)})

//     useEffect(()=>{
//     fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
//     .then(response => response.json)
//     .then(data=>{console.log(data.results);
//       setQuestions(data.results)})
//     },[])
//     useEffect(() => {
//         const fetchQuestions = async () => {
//           try {
//             const response = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple");
//             if (!response.ok) {
//               throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const data = await response.json();
//             if (data.results) {
//               setQuestions(data.results);
//             }
//           } catch (error) {
//             setError(error);
//             console.error("Error fetching the quiz data:", error);
//           } finally {
//             setLoading(false);
//           }
//         };
    
//         fetchQuestions();
//       }, []);
//     return(
//         <div>{questions[0]}</div>
//     )
// }

// 

// import React from 'react'
// import "./App.css";

// const Quiz = () => {
//   return (
//     <div className='quiz'>
//       <div className='design-top'></div>
//       <div className='question-block'>
//         <h3 className='question'>How would one say good bye in spanish</h3>
//         <div className='options'>
//           <button className='optionlist'>option1</button>
//           <button className='optionlist'>option2</button>
//           <button className='optionlist'>option3</button>
//           <button className='optionlist'>option4</button>
//         </div>
//       </div>
//       <br/>
//       <div className='question-block'>
//         <h3 className='question'>How would one say good bye in spanish</h3>
//         <div className='options'>
//           <button className='optionlist'>option1</button>
//           <button className='optionlist'>option2</button>
//           <button className='optionlist'>option3</button>
//           <button className='optionlist'>option4</button>
//         </div>
//       </div>
//       <br></br>
//       <div className='question-block'>
//         <h3 className='question'>How would one say good bye in spanish</h3>
//         <div className='options'>
//           <button className='optionlist'>option1</button>
//           <button className='optionlist'>option2</button>
//           <button className='optionlist'>option3</button>
//           <button className='optionlist'>option4</button>
//         </div>
//       </div>
//       <br></br>
//       <div className='question-block'>
//         <h3 className='question'>How would one say good bye in spanish</h3>
//         <div className='options'>
//           <button className='optionlist'>option1</button>
//           <button className='optionlist'>option2</button>
//           <button className='optionlist'>option3</button>
//           <button className='optionlist'>option4</button>
//         </div>
//       </div>
//       <br></br>
//       <div className='question-block'>
//         <h3 className='question'>How would one say good bye in spanish</h3>
//         <div className='options'>
//           <button className='optionlist'>option1</button>
//           <button className='optionlist'>option2</button>
//           <button className='optionlist'>option3</button>
//           <button className='optionlist'>option4</button>
//         </div>
//       </div>
      
//       <button className='result'>Check answers</button>
     
      
//     </div>
//   )
// }

// export default Quiz

// 