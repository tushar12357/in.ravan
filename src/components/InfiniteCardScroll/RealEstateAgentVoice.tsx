import React, { useEffect, useRef, useState } from "react";
import { X, ChevronUp } from "lucide-react";
import AudioWaveform from "./AudioWaveform";

interface RealEstateAgentVoiceProps {
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  onClose?: () => void;
  sessionStatus?: string | undefined | null;
  agentName?: string | undefined | null;
}

const RealEstateAgentVoice: React.FC<RealEstateAgentVoiceProps> = ({
  isExpanded = false,
  onToggleExpand = () => {},
  onClose,
  sessionStatus,
  agentName,
}) => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Format timer display as MM:SS
  const formatDuration = (s: number): string => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Start timer when agentName is present
  useEffect(() => {
    if (agentName) {
      setSeconds(0); // reset
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [agentName]);

  // Stop timer on close
  const handleClose = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    onClose?.();
  };

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-50 px-4 max-w-full">
      <div className="bg-black text-white rounded-full flex items-center pl-3 pr-1 py-1 shadow-lg">
        <div className="flex items-center gap-2">
          <AudioWaveform />
          <span className="text-sm font-medium whitespace-nowrap">
            {agentName}
          </span>
          <span className="text-xs text-gray-400 ml-1">
            {formatDuration(seconds)}
          </span>
          <button
            onClick={onToggleExpand}
            className="p-1 rounded-full hover:bg-gray-800 transition-colors"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <ChevronUp
              size={18}
              className={`transform transition-transform ${
                isExpanded ? "" : "rotate-180"
              }`}
            />
          </button>
        </div>
      </div>
      <button
        onClick={handleClose}
        className="bg-red-500 hover:bg-red-600 transition-colors p-2 rounded-full shadow-lg"
        aria-label="Close"
      >
        <X size={20} className="text-white" />
      </button>
    </div>
  );
};

export default RealEstateAgentVoice;
