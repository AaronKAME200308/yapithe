import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  value: number;
  suffix?: string;
  duration?: number;
}

const CountUp = ({ value, suffix = "", duration = 1 }: Props) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration * 60);

    const counter = setInterval(() => {
      start += increment;

      if (start >= value) {
        start = value;
        clearInterval(counter);
      }

      setCount(Math.floor(start));
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [value, duration]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {count}
      {suffix}
    </motion.span>
  );
};

export default CountUp;
