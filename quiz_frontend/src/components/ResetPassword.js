import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { identifier } = location.state || {};

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    console.log('Resetting password for:', identifier, 'with code:', code, 'new password:', newPassword);
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-1E3A8A mb-6 text-center">Reset Password</h2>
      {error && <p className="text-FBBF24 text-center mb-4">{error}</p>}
      <div className="space-y-4">
        <div>
          <label className="block text-1E3A8A">Verification Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-3 border border-1E3A8A rounded-lg focus:outline-none focus:ring-2 focus:ring-FBBF24"
          />
        </div>
        <div>
          <label className="block text-1E3A8A">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 border border-1E3A8A rounded-lg focus:outline-none focus:ring-2 focus:ring-FBBF24"
          />
        </div>
        <div>
          <label className="block text-1E3A8A">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border border-1E3A8A rounded-lg focus:outline-none focus:ring-2 focus:ring-FBBF24"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-1E3A8A text-white p-3 rounded-lg hover-scale transition duration-300"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;