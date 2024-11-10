// src/components/AnimatedNumber.jsx
import { useState, useEffect } from 'react';

const AnimatedNumber = ({ value, prevValue }) => {
  const [animationKey, setAnimationKey] = useState(0);
  const [color, setColor] = useState('text-white');
  const [shouldShake, setShouldShake] = useState(false);

  useEffect(() => {
    if (value !== prevValue) {
      // Increment key to force re-render
      setAnimationKey(prev => prev + 1);
      
      // Set color based on value change
      if (value > prevValue) {
        setColor('text-green-400');
      } else if (value < prevValue) {
        setColor('text-red-400');
      }
      
      // Trigger shake animation
      setShouldShake(true);

      // Reset color and shake after animation
      const timer = setTimeout(() => {
        setColor('text-white');
        setShouldShake(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  return (
    <div 
      key={animationKey}
      className={`inline-block ${shouldShake ? 'animate-shake' : ''}`}
    >
      <span className={`${color} transition-colors duration-300`}>
        {value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
      </span>
    </div>
  );
};

export default AnimatedNumber;