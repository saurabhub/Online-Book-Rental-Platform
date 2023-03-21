import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
const [count, setCount] = useState(3)
const navigate = useNavigate()

useEffect(() => {
    const interval = setInterval(() => {
        setCount((count)=>(--count))
    }, 1000);

    count === 0 && navigate("/")
  return () => {
    clearInterval(interval)
  }
}, [count])

  return (
    <p className="count-down-timer">
      You will be redirected in{" "}
      <time>
        <strong id="seconds">{count}</strong> seconds
      </time>
      .
    </p>
  );
};

export default LoadingToRedirect;
