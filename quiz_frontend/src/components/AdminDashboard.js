import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-1E3A8A mb-6 text-center">Admin Dashboard</h2>
      <div className="space-y-4">
        <button
          onClick={() => navigate('/admin/quizzes/new')}
          className="w-full bg-1E3A8A text-white p-3 rounded-lg hover-scale transition duration-300"
        >
          Add New Quiz
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;