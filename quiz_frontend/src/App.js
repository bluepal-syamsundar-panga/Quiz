import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import QuizList from './components/QuizList';
import QuizForm from './components/QuizForm';
import QuestionForm from './components/QuestionForm';
import QuizAttempt from './components/QuizAttempt';
import Leaderboard from './components/Leaderboard';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    setIsAuthenticated(!!token);
    setRole(userRole || '');
  }, []);

  const handleLogin = (token, userRole) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    setIsAuthenticated(true);
    setRole(userRole);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setRole('');
  };

  const isAdmin = (username, password) => username === 'Syamsundar' || username === 'pangasyamsundar1805@gmail.com' && password === 'Syam@1805';

  return (
    <Router>
      <div className="min-h-screen flex flex-col text-1E3A8A">
        <header className="bg-white shadow-md fixed w-full z-10 animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Quiz App</h1>
            <nav className="space-x-6">
              {isAuthenticated ? (
                <>
                  <a href="/" className="hover:text-FBBF24">Home</a>
                  {role === 'ADMIN' && <a href="/admin" className="hover:text-FBBF24">Admin Dashboard</a>}
                  <a href="/leaderboard" className="hover:text-FBBF24">Leaderboard</a>
                  <button onClick={handleLogout} className="bg-1E3A8A text-white px-4 py-2 rounded hover-scale">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <a href="/login" className="hover:text-FBBF24">Login</a>
                  <a href="/register" className="hover:text-FBBF24">Register</a>
                </>
              )}
            </nav>
          </div>
        </header>

        <main className="flex-grow pt-20">
          <section className="bg-1E3A8A text-white py-20 text-center animate-fade-in" style={{ backgroundImage: 'url(https://via.placeholder.com/1920x500)' }}>
            <h2 className="text-4xl font-bold mb-4">Start Your Quiz Journey</h2>
            <p className="text-lg mb-6">Test your knowledge with our interactive quizzes!</p>
            {!isAuthenticated && (
              <a href="/login" className="bg-FBBF24 text-1E3A8A px-6 py-3 rounded hover-scale">Get Started</a>
            )}
          </section>

          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} isAdmin={isAdmin} /> : <Navigate to="/" />} />
            <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
            <Route path="/forgot-password" element={!isAuthenticated ? <ForgotPassword /> : <Navigate to="/" />} />
            <Route path="/reset-password" element={!isAuthenticated ? <ResetPassword /> : <Navigate to="/" />} />
            <Route path="/" element={isAuthenticated ? <QuizList role={role} isAuthenticated={isAuthenticated} /> : <Navigate to="/login" />} />
            <Route path="/admin" element={isAuthenticated && role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/login" />} />
            <Route path="/admin/quizzes/new" element={isAuthenticated && role === 'ADMIN' ? <QuizForm /> : <Navigate to="/login" />} />
            <Route path="/admin/quizzes/:quizId/questions/new" element={isAuthenticated && role === 'ADMIN' ? <QuestionForm /> : <Navigate to="/login" />} />
            <Route path="/quizzes/:quizId/attempt" element={isAuthenticated ? <QuizAttempt isAuthenticated={isAuthenticated} /> : <Navigate to="/login" />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>

        <footer className="bg-white text-1E3A8A py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>© 2025 Quiz App. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <a href="#" className="hover:text-FBBF24">Privacy Policy</a>
              <a href="#" className="hover:text-FBBF24">Contact Us</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;