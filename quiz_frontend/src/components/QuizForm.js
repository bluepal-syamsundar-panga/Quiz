import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function QuizForm() {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post(
        '/api/admin/quizzes',
        { title },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      navigate('/admin');
    } catch (err) {
      setError('Quiz title already exists');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-1E3A8A mb-6 text-center">Create New Quiz</h2>
      {error && <p className="text-FBBF24 text-center mb-4">{error}</p>}
      <div className="space-y-4">
        <div>
          <label className="block text-1E3A8A">Quiz Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-1E3A8A rounded-lg focus:outline-none focus:ring-2 focus:ring-FBBF24"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-1E3A8A text-white p-3 rounded-lg hover-scale transition duration-300"
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default QuizForm;