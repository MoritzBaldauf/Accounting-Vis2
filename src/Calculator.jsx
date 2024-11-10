import { useState, useEffect } from 'react';

const Calculator = () => {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState('text-white');
  const [prevCount, setPrevCount] = useState(0);
  const [animationKey, setAnimationKey] = useState(0); // Add key for forcing animation

  useEffect(() => {
    if (count !== prevCount) {
      // Increment animation key to force re-render with animation
      setAnimationKey(prev => prev + 1);
      
      // Set color based on value change
      if (count > prevCount) {
        setColor('text-green-400');
      } else if (count < prevCount) {
        setColor('text-red-400');
      }

      // Reset color after a second
      const colorTimer = setTimeout(() => {
        setColor('text-white');
      }, 1000);

      setPrevCount(count);

      // Cleanup timer
      return () => {
        clearTimeout(colorTimer);
      };
    }
  }, [count, prevCount]);

  const handleAdd = () => {
    setCount(prev => prev + 1);
  };

  const handleSubtract = () => {
    setCount(prev => prev - 1);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-gray-800 rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-4 text-white">Simple Calculator</h1>
      
      <div key={animationKey} className="animate-shake text-6xl font-bold">
        <span className={`${color} transition-all duration-300`}>{count}</span>
      </div>
      
      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleSubtract}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 active:bg-red-700 transition-colors text-xl"
        >
          -
        </button>
        <button
          onClick={handleAdd}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 active:bg-green-700 transition-colors text-xl"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Calculator;