import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([
    [1, 'user1', 90],
    [2, 'user2', 85],
    [1, 'user3', 75],
  ]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('/api/leaderboard');
        setLeaderboard(response.data);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-1E3A8A mb-6">Leaderboard</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-F3F4F6">
            <th className="p-3 text-left text-1E3A8A">Quiz ID</th>
            <th className="p-3 text-left text-1E3A8A">Username</th>
            <th className="p-3 text-left text-1E3A8A">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map(([quizId, username, score], index) => (
            <tr key={index} className="border-t border-1E3A8A">
              <td className="p-3">{quizId}</td>
              <td className="p-3">{username}</td>
              <td className="p-3">{score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;