import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function QuizAttempt({ isAuthenticated }) {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const sampleQuestions = {
    1: Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      title: `Math Question ${i + 1}: What is ${i + 1} + ${i + 2}?`,
      option1: `${i + 1}`,
      option2: `${i + 3}`,
      option3: `${i + 4}`,
      option4: `${i + 5}`,
      correctAnswer: 2,
    })),
    2: Array.from({ length: 25 }, (_, i) => ({
      id: i + 26,
      title: `Science Question ${i + 1}: What is the ${i + 1}th element?`,
      option1: 'Hydrogen',
      option2: 'Oxygen',
      option3: 'Carbon',
      option4: 'Nitrogen',
      correctAnswer: i % 4 + 1,
    })),
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`/api/admin/quizzes/${quizId}/questions`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setQuestions(response.data.length ? response.data : sampleQuestions[quizId] || []);
      } catch (err) {
        console.error('Error fetching questions:', err);
        setQuestions(sampleQuestions[quizId] || []);
      }
    };
    if (isAuthenticated) fetchQuestions();
  }, [quizId, isAuthenticated]);

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const score = Object.values(answers).filter((ans, i) => ans === questions[i].correctAnswer).length;
      setResult({ score, total: questions.length });
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-1E3A8A mb-6">Take Quiz</h2>
      {result ? (
        <div className="text-center">
          <p className="text-xl">Your Score: {result.score} / {result.total}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 bg-1E3A8A text-white px-6 py-3 rounded-lg hover-scale transition duration-300"
          >
            Back to Quizzes
          </button>
        </div>
      ) : currentQuestion ? (
        <div className="space-y-6 animate-fade-in">
          <div className="p-4 border border-1E3A8A rounded-xl">
            <h3 className="text-lg font-semibold text-1E3A8A mb-2">{currentQuestion.title}</h3>
            {[currentQuestion.option1, currentQuestion.option2, currentQuestion.option3, currentQuestion.option4].map((option, index) => (
              <div key={index} className="flex items-center mt-2">
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={index + 1}
                  onChange={() => handleAnswer(currentQuestion.id, index + 1)}
                  className="mr-2"
                />
                <label className="text-1E3A8A">{option}</label>
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-1E3A8A text-white p-3 rounded-lg hover-scale transition duration-300"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Submit Quiz'}
          </button>
          <p className="text-center text-1E3A8A">Question {currentQuestionIndex + 1} of {questions.length}</p>
        </div>
      ) : (
        <p className="text-center text-1E3A8A">Loading questions...</p>
      )}
    </div>
  );
}

export default QuizAttempt;