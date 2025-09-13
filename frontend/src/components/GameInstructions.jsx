import React from 'react';

export default function GameInstructions() {
  return (
    <section className="mb-6 bg-gray-50 dark:bg-gray-700 p-4 rounded text-sm text-gray-700 dark:text-gray-300">
      <h2 className="font-semibold mb-2">How to Play</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Guess two numbers between 00 and 99.</li>
        <li>Your guesses will be compared to two predefined expected numbers.</li>
        <li>Win rewards based on how closely your guesses match the expected numbers.</li>
        <li>Rewards range from Ksh 100 to Ksh 10000 depending on match conditions.</li>
        <li>Try to accumulate the highest reward to become the master of the game!</li>
        <li>You have only one attempt.</li>
        <li>Use the dark mode toggle for comfortable viewing.</li>
      </ul>
    </section>
  );
}