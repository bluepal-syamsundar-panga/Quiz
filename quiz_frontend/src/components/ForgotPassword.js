import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [identifier, setIdentifier] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log('Sending code to:', identifier);
    navigate('/reset-password', { state: { identifier } });
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-1E3A8A mb-6 text-center">Forgot Password</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-1E3A8A">Email or Username</label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full p-3 border border-1E3A8A rounded-lg focus:outline-none focus:ring-2 focus:ring-FBBF24"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-1E3A8A text-white p-3 rounded-lg hover-scale transition duration-300"
        >
          Send Code
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;