import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin, isAdmin }) {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      const userRole = isAdmin(username, password) ? 'ADMIN' : 'USER';
      onLogin(response.data.token, userRole);
      navigate('/');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-1E3A8A mb-6 text-center">Welcome to Quiz App</h2>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-1E3A8A text-white p-3 rounded-lg hover-scale transition duration-300 animate-bounce"
      >
        Get Started
      </button>
      <p className="text-center text-1E3A8A mt-4">
        Forgot Password?{' '}
        <span className="text-FBBF24 cursor-pointer hover:underline" onClick={() => navigate('/forgot-password')}>
          Click Here
        </span>
      </p>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <Dialog.Panel className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md animate-slide-in">
          <Dialog.Title className="text-2xl font-bold text-1E3A8A mb-4">Login</Dialog.Title>
          {error && <p className="text-FBBF24 text-center mb-4">{error}</p>}
          <div className="space-y-4">
            <div>
              <label className="block text-1E3A8A">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-1E3A8A rounded-lg focus:outline-none focus:ring-2 focus:ring-FBBF24"
              />
            </div>
            <div>
              <label className="block text-1E3A8A">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-1E3A8A rounded-lg focus:outline-none focus:ring-2 focus:ring-FBBF24"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-1E3A8A text-white p-3 rounded-lg hover-scale transition duration-300"
            >
              Login
            </button>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 text-1E3A8A hover:text-FBBF24"
          >
            Close
          </button>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}

export default Login;