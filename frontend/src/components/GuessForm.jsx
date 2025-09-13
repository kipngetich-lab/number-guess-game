import React, { useState, useEffect } from 'react';

export default function GuessForm({ onGuess, loading, attempted }) {
  const [name, setName] = useState('');
  const [guess1, setGuess1] = useState('');
  const [guess2, setGuess2] = useState('');

  // Disable inputs after attempt
  const disabled = loading || attempted;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (disabled) return;

    // Validation
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }

    if (!/^\d{1,2}$/.test(guess1) || !/^\d{1,2}$/.test(guess2)) {
      alert('Guesses must be numbers between 00 and 99');
      return;
    }

    const g1 = parseInt(guess1, 10);
    const g2 = parseInt(guess2, 10);
    if (g1 < 0 || g1 > 99 || g2 < 0 || g2 > 99) {
      alert('Guesses must be between 00 and 99');
      return;
    }

    onGuess(name.trim(), guess1.padStart(2, '0'), guess2.padStart(2, '0'));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Username
        </label>
        <input
          id="name"
          type="text"
          maxLength={30}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100"
          placeholder="Enter your name"
          required
          disabled={disabled}
        />
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="guess1" className="block text-sm font-medium mb-1">
            Guess Number 1 (00-99)
          </label>
          <input
            id="guess1"
            type="number"
            min="0"
            max="99"
            value={guess1}
            onChange={(e) => setGuess1(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100"
            placeholder="00"
            required
            disabled={disabled}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="guess2" className="block text-sm font-medium mb-1">
            Guess Number 2 (00-99)
          </label>
          <input
            id="guess2"
            type="number"
            min="0"
            max="99"
            value={guess2}
            onChange={(e) => setGuess2(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100"
            placeholder="00"
            required
            disabled={disabled}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Checking...' : attempted ? 'Attempt Used' : 'Submit Guess'}
      </button>

      {attempted && (
        <p className="mt-2 text-red-600 dark:text-red-400 font-semibold text-center">
          You have used your one allowed attempt.
        </p>
      )}
    </form>
  );
}