import React, { useEffect, useState } from "react";

const Time = () => {
  const [timer, setTimer] = useState(30);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);
  });
  return timer;
};

export default Time;
