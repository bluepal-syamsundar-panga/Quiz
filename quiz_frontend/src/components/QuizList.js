import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function QuizList({ role, isAuthenticated }) {
  const [quizzes, setQuizzes] = useState([
    { id: 1, title: 'Mathematics Quiz', category: 'Mathematics' },
    { id: 2, title: 'Science Quiz', category: 'Science' },
    { id: 3, title: 'Social Quiz', category: 'Social' },
    { id: 4, title: 'English Quiz', category: 'English' },
    { id: 5, title: 'Physics Quiz', category: 'Physics' },
    { id: 6, title: 'Arithmetic and Reasoning Quiz', category: 'Arithmetic' },
    { id: 7, title: 'C Language Quiz', category: 'C Language' },
    { id: 8, title: 'Java Quiz', category: 'Java' },
    { id: 9, title: 'Html and CSS Quiz', category: 'Html/CSS' },
    { id: 10, title: 'JavaScript Quiz', category: 'JavaScript' },
    { id: 11, title: 'Python Quiz', category: 'Python' },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('/api/admin/quizzes', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setQuizzes(response.data);
      } catch (err) {
        console.error('Error fetching quizzes:', err);
      }
    };
    if (isAuthenticated) fetchQuizzes();
  }, [isAuthenticated]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/quizzes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
    } catch (err) {
      console.error('Error deleting quiz:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold text-1E3A8A mb-8 animate-fade-in">Available Quizzes</h2>
      {role === 'ADMIN' && (
        <button
          onClick={() => navigate('/admin/quizzes/new')}
          className="mb-6 bg-1E3A8A text-white px-6 py-3 rounded-lg hover-scale transition duration-300"
        >
          Create New Quiz
        </button>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 animate-fade-in">
            <h3 className="text-xl font-semibold text-1E3A8A mb-2">{quiz.title}</h3>
            <p className="text-1E3A8A mb-2">Category: {quiz.category}</p>
            <div className="flex justify-between items-center">
              <button
                onClick={() => navigate(`/quizzes/${quiz.id}/attempt`)}
                className="text-FBBF24 hover:underline"
              >
                Take Quiz
              </button>
              {role === 'ADMIN' && (
                <div>
                  <button
                    onClick={() => navigate(`/admin/quizzes/${quiz.id}/questions/new`)}
                    className="mr-2 text-green-600 hover:underline"
                  >
                    Add Question
                  </button>
                  <button
                    onClick={() => handleDelete(quiz.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizList;