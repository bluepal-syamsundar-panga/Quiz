import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function QuestionForm() {
  const [title, setTitle] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [error, setError] = useState('');
  const { quizId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post(
        `/api/admin/quizzes/${quizId}/questions`,
        { title, option1, option2, option3, option4, correctAnswer: parseInt(correctAnswer) },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      navigate('/admin');
    } catch (err) {
      setError('Failed to add question');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-1E3A8A mb-6 text-center">Add Question</h2>
      {error && <p className="text-FBBF24 text-center mb-4">{error}</p>}
      <div className="space-y-4">
        <div>
          <label className="block text-1E3A8A">Question Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-1E3A8A rounded-lg focus:outline-none focus:ring-2 focus:ring-FBBF24"
          />
        </div>
        <div>
          <label className="block text-1E3A8A">Option 1</label>
          <input
            type="text"
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
            className="w-full p-3 border border-1E3A8A rounded-lg focus:outline-none focus:ring-2 focus:ring-FBBF24"
          />
        </div>
        <div>
          <label className="block text-1E3A8A">Option 2</label>
          <input
            type="text"
            value={option2}
            onChange={(e) => setOption2(e.target.value)}
            className="w-full p-3 border border-1E3A8A rounded-lg focus:outline-none focus:ring-2 focus:ring-FBBF24"
          />
        </div>
        <div>
          <label className="block text-1E3A8A">Option 3</label>
          <input
            type="text"
            value={option3}
            onChange={(e) => setOption3(e.target.value)}
            className="w-full p-3 border border-1E3A8A rounded-lg focus:outline-none focus:ring-2 focus:ring-FBBF24"
          />
        </div>
        <div>
          <label className="block text-1E3A8A">Option 4</label>
          <input
            type="text"
            value={option4}
            onChange={(e) => setOption4(e.target.value)}
            className="w-full p-3 border border-1E3A8A rounded-lg focus:outline-none focus:ring-2 focus:ring-FBBF24"
          />
        </div>
        <div>
          <label className="block text-1E3A8A">Correct Answer (1-4)</label>
          <input
            type="number"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="w-full p-3 border border-1E3A8A rounded-lg focus:outline-none focus:ring-2 focus:ring-FBBF24"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-1E3A8A text-white p-3 rounded-lg hover-scale transition duration-300"
        >
          Add Question
        </button>
      </div>
    </div>
  );
}

export default QuestionForm;