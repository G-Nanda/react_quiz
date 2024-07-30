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

import React, { useState, useEffect } from "react";

// Mock data to use when the API is being rate-limited
const mockData = [
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "medium",
    question: "What is the capital of France?",
    correct_answer: "Paris",
    incorrect_answers: ["London", "Berlin", "Madrid"],
  },
  // Add more mock questions here
];

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Debugging: Log when useEffect is triggered
    console.log("useEffect triggered");

    let isMounted = true; // Prevent state updates if the component is unmounted

    const fetchQuestions = async (retryCount = 0) => {
      // Debugging: Log when fetch is called
      console.log("Fetching questions...");

      if (!isMounted) return; // Exit if the component is unmounted

      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple"
        );

        if (!response.ok) {
          if (response.status === 429) {
            if (retryCount < 5) {
              const waitTime = 1000 * 2 ** retryCount;
              console.log(`Rate limit exceeded. Retrying in ${waitTime / 1000} seconds...`);
              await new Promise((resolve) => setTimeout(resolve, waitTime)); // Exponential backoff
              fetchQuestions(retryCount + 1);
              return;
            } else {
              console.log("Exceeded maximum retry attempts. Using mock data.");
              setQuestions(mockData);
              setLoading(false);
              return;
            }
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }

        const data = await response.json();
        console.log("Fetched Data:", data);
        if (data.results) {
          setQuestions(data.results);
        } else {
          throw new Error("No results found in the fetched data.");
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching the quiz data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();

    return () => {
      isMounted = false; // Cleanup function to prevent state updates on unmounted component
    };
  }, []); // Ensure this runs only once when the component mounts

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex < questions.length) {
        return nextIndex;
      } else {
        return prevIndex; // Keep index the same if at the end
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}. Please try again later.</div>;
  }

  if (questions.length === 0) {
    return <div>No questions available.</div>;
  }

  // Check if the current question index is out of bounds
  if (currentQuestionIndex >= questions.length) {
    return <div>No more questions available.</div>;
  }

  const { question, correct_answer, incorrect_answers } = questions[currentQuestionIndex];
  const answers = shuffleArray([...incorrect_answers, correct_answer]);

  return (
    <div>
      <h2 dangerouslySetInnerHTML={{ __html: question }} />
      <ul>
        {answers.map((answer, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: answer }} />
        ))}
      </ul>
      {currentQuestionIndex < questions.length - 1 && (
        <button onClick={handleNextQuestion}>Next Question</button>
      )}
    </div>
  );
}

// Utility function to shuffle the answers
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

