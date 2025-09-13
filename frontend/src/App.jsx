import React, { useState, useEffect } from 'react';
import GuessForm from './components/GuessForm';
import RewardDisplay from './components/RewardDisplay';
import MasterUserDisplay from './components/MasterUserDisplay';
import DarkModeToggle from './components/DarkModeToggle';
import GameInstructions from './components/GameInstructions';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:5000';


export default function App() {
  const [rewardInfo, setRewardInfo] = useState(null);
  const [masterUser, setMasterUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [expectedNumbers, setExpectedNumbers] = useState(['00', '00']);
  const [loading, setLoading] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [currentUserName, setCurrentUserName] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/api/game/master`)
      .then((res) => res.json())
      .then((data) => {
        setMasterUser(data.masterUser);
        setAllUsers(data.allUsers);
        setExpectedNumbers(data.expectedNumbers);
      })
      .catch(console.error);
  }, []);

  const handleGuess = async (name, guess1, guess2) => {
    setLoading(true);
    setCurrentUserName(name);
    try {
      const res = await fetch(`${API_URL}/api/game/guess`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, guess1, guess2 }),
      });
      const data = await res.json();
      if (res.ok) {
        setRewardInfo({ ...data, name });
        setMasterUser(data.masterUser);
        setAttempted(true);
        // Update allUsers list
        fetch(`${API_URL}/api/game/master`)
          .then((res) => res.json())
          .then((data) => setAllUsers(data.allUsers));
      } else {
        alert(data.error || 'Error submitting guess');
        if (data.error && data.error.includes('already made')) {
          setAttempted(true);
        }
      }
    } catch (e) {
      alert('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-md mx-auto w-full">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Number Guess Game</h1>
        <DarkModeToggle />
      </div>

      <GameInstructions />

      <GuessForm onGuess={handleGuess} loading={loading} attempted={attempted} />

      {rewardInfo && <RewardDisplay rewardInfo={rewardInfo} />}

      <MasterUserDisplay masterUser={masterUser} allUsers={allUsers} />

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4"> 
        <div className="container text-center text-sm text-gray-600 dark:text-gray-300"> © {new Date().getFullYear()} NumberGuessGame — All rights reserved </div> 
      </footer>
    </div>
  );
}