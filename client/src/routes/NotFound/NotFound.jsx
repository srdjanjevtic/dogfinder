import { useEffect, useState } from "react";
import "./notFound.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const [time, setTime] = useState(10000);
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();

  function startCountdown(seconds) {
    let counter = seconds / 1000;
    const interval = setInterval(() => {
      counter--;
      setSeconds(counter);
      if (counter === 0) {
        clearInterval(interval);
        console.log("Redirected!");
      }
    }, 1000);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, time);

    startCountdown(time);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="content parent">
      <p className="not-found">NOT FOUND !</p>
      <p className="redirect">Redirecting in {seconds} seconds ...</p>
    </div>
  );
};

export default NotFound;
