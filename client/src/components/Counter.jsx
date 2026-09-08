import React, { useEffect, useRef, useState } from "react";

export default function Counter({ value, duration = 2000, className = "" }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  // Extract prefix, number, and suffix (e.g. "1000+" -> prefix: "", number: 1000, suffix: "+")
  const strVal = String(value || "");
  const match = strVal.match(/^([^0-9.]*)([0-9.]+)(.*)$/);
  const prefix = match ? match[1] : "";
  const targetNum = match ? parseFloat(match[2]) : 0;
  const suffix = match ? match[3] : "";
  const isDecimal = match && match[2].includes(".");
  const decimalPlaces = isDecimal ? match[2].split(".")[1].length : 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime = null;

          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Ease out cubic for smooth deceleration
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentNum = targetNum * easeOutCubic;

            setCount(currentNum);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(targetNum);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [targetNum, duration, hasAnimated]);

  if (!match) {
    return <span className={className}>{value}</span>;
  }

  const formattedCount = isDecimal
    ? count.toFixed(decimalPlaces)
    : Math.floor(count);

  return (
    <span ref={elementRef} className={className}>
      {hasAnimated ? `${prefix}${formattedCount}${suffix}` : `${prefix}0${suffix}`}
    </span>
  );
}
