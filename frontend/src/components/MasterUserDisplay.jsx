import React from 'react';

export default function MasterUserDisplay({ masterUser, allUsers }) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">Master of the Game</h2>
      {masterUser ? (
        <div className="mb-4 p-4 border border-yellow-400 bg-yellow-50 dark:bg-yellow-900 dark:border-yellow-700 rounded text-yellow-700 dark:text-yellow-300">
          <p>
            <span className="font-bold">{masterUser.name}</span> with total
            accumulated reward of{' '}
            <span className="font-bold">Ksh {masterUser.accumulatedReward}</span>
          </p>
        </div>
      ) : (
        <p>No master user yet.</p>
      )}

      <h3 className="text-lg font-semibold mb-2">All Users Rewards</h3>
      {allUsers.length > 0 ? (
        <ul className="text-sm max-h-48 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-800">
          {allUsers.map((user) => (
            <li
              key={user._id}
              className={`py-1 ${
                masterUser && user.name === masterUser.name
                  ? 'font-bold text-yellow-600 dark:text-yellow-400'
                  : ''
              }`}
            >
              {user.name}: Ksh {user.accumulatedReward}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users played yet.</p>
      )}
    </section>
  );
}