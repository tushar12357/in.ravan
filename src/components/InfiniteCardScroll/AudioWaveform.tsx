import React, { useEffect, useState } from 'react';

const AudioWaveform: React.FC = () => {
  const [heights, setHeights] = useState<number[]>([4, 6, 8, 7, 5, 3]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setHeights(prevHeights => {
        return prevHeights.map(() => Math.max(3, Math.min(10, 3 + Math.random() * 7)));
      });
    }, 150);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center h-4 gap-[2px]">
      {heights.map((height, i) => (
        <div 
          key={i} 
          className="bg-white w-[2px] transition-all duration-150" 
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  );
};

export default AudioWaveform;