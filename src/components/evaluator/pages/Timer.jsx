import React, { useState, useEffect } from "react";

const Timer = ({ startTime }) => {
  const calculateRemainingTime = () => {
    const now = new Date();
    const start = new Date(startTime);
    const elapsedTime = now - start;
    const remainingTime = 24 * 60 * 60 * 1000 - elapsedTime; // 24 hours in milliseconds
    return remainingTime > 0 ? remainingTime : 0;
  };

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [startTime]);

  const formatTime = (timeInMillis) => {
    const totalSeconds = Math.floor(timeInMillis / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return <div className="timer">Time remaining: {formatTime(remainingTime)}</div>;
};

export default Timer;