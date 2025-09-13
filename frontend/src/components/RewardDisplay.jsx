import React from 'react';

export default function RewardDisplay({ rewardInfo }) {
  const { reward, reason, accumulatedReward, name } = rewardInfo;

  return (
    <div className="mb-6 p-4 border border-green-500 bg-green-50 dark:bg-green-900 dark:border-green-700 rounded text-green-700 dark:text-green-300">
      <h2 className="text-lg font-semibold mb-2">Result for {name}</h2>
      <p>
        Reward: <span className="font-bold">Ksh {reward}</span>
      </p>
      <p>Reason: {reason}</p>
      <p className="mt-2 font-semibold">
        Your Accumulated Reward: Ksh {accumulatedReward}
      </p>
    </div>
  );
}