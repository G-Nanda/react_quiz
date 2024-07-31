import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import './App.css';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const [score, setScore] = useState(0); // State to track score

  // Function to fetch questions
  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        'https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple'
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.results) {
        const questionsWithShuffledOptions = data.results.map((q) => ({
          ...q,
          options: shuffleArray([...q.incorrect_answers, q.correct_answer]),
        }));
        setQuestions(questionsWithShuffledOptions);
        setSelectedOptions(Array(data.results.length).fill(null));
        setConfetti(false); // Reset confetti
        setScore(0); // Reset score
      }
    } catch (error) {
      setError(error);
      console.error('Error fetching the quiz data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleOptionClick = (questionIndex, option) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = option;
    setSelectedOptions(newSelectedOptions);
  };

  const checkAnswers = () => {
    let newScore = 0;
    questions.forEach((q, index) => {
      if (selectedOptions[index] === q.correct_answer) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setShowResults(true);
    if (newScore === questions.length) {
      setConfetti(true); // Trigger confetti effect
    }
  };

  const resetQuiz = () => {
    setShowResults(false);
    setLoading(true);
    fetchQuestions(); // Fetch new questions
  };

  const getOptionClass = (questionIndex, option) => {
    if (!showResults) {
      return selectedOptions[questionIndex] === option ? 'selected' : '';
    }
    if (option === questions[questionIndex].correct_answer) {
      return 'correct';
    }
    if (selectedOptions[questionIndex] === option) {
      return 'incorrect';
    }
    return '';
  };

  // const getButtonStyle = (option) => {
  //   const baseWidth = 120; // Base width
  //   const baseHeight = 45; // Base height
  //   const padding = 10; // Padding around text
  //   const maxWidth = 200; // Max width

  //   // Calculate width based on text length, up to maxWidth
  //   const textWidth = Math.min(option.length * 10, maxWidth - padding * 2);
  //   const width = Math.max(baseWidth, textWidth + padding * 2);
  //   const height = baseHeight;

  //   return { width: `${width}px`, height: `${height}px` };
  // };

  const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='quiz'>
      {confetti && <Confetti />}
      <div className='design-top'></div>
      {questions.map((q, index) => (
        <div key={index} className='question-block'>
          <h3 className='question'>{`Question ${index + 1}:  ${decodeHtml(q.question)}`}</h3>
          <div className='options'>
            {q.options.map((option, i) => (
              <button
                key={i}
                className={`optionlist ${getOptionClass(index, option)}`}
                onClick={() => handleOptionClick(index, option)}
                // style={getButtonStyle(option)} // Apply dynamic styles
                disabled={showResults} // Disable option buttons after showing results
              >
                {decodeHtml(option)}
              </button>
            ))}
            <br></br>
          </div>
          {showResults && (
            <p className='result-message'>
              {selectedOptions[index] === q.correct_answer ? 'Correct!' : `Wrong! The correct answer is ${decodeHtml(q.correct_answer)}.`}
            </p>
          )}
        </div>
      ))}

      {!showResults && (
        <button className='result' onClick={checkAnswers}>
          Check Answers
        </button>
      )}

      {showResults && (
        <>
          <p className='score'>You scored {score} out of {questions.length}!</p>
          <button className='result' onClick={resetQuiz}>
            Play Again
          </button>
        </>
      )}

      <div className='design-bottom'></div>
    </div>
  );
};

// Helper function to shuffle options
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export default Quiz;





