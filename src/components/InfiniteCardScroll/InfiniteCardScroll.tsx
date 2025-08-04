import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import { Card } from "./Card";
import type { CardInterface } from "../../types";
import "./InfiniteCardScroll.css";
import RealEstateAgentVoice from "./RealEstateAgentVoice";

interface InfiniteCardScrollProps {
  cards: CardInterface[];
  className?: string;
  pauseDuration?: number;
  handleStart: (agent_code: string) => void;
  handleEnd: () => void;
  stopScrolls?: boolean;
  resumeScrolls?: boolean;
  showRealEstateAgentVoice?: boolean;
  sessionStatus?: string | undefined | null;
}

const CARD_WIDTH = 280 + 24; // Card width + margin

export const InfiniteCardScroll: React.FC<InfiniteCardScrollProps> = memo(
  ({
    cards,
    className = "",
    pauseDuration = 2000,
    handleStart,
    handleEnd,
    stopScrolls = false,
    resumeScrolls = false,
    showRealEstateAgentVoice,
    sessionStatus,
  }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [isScrolling, setIsScrolling] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [agentName, setAgentName] = useState<string | undefined | null>(
      undefined
    );

    // Touch support
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    // Debounced scroll handler
    const debounce = useCallback((func: () => void, wait: number) => {
      let timeout: NodeJS.Timeout;
      return () => {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
      };
    }, []);

    const scrollTo = useCallback((position: number) => {
      const container = scrollRef.current;
      if (container) {
        container.scrollTo({ left: position, behavior: "smooth" });
      }
    }, []);

    const checkAndHandleEnd = useCallback(() => {
      const container = scrollRef.current;
      if (!container) return false;

      const scrollPos = container.scrollLeft;
      const totalWidth = container.scrollWidth;
      const containerWidth = container.clientWidth;

      if (scrollPos + containerWidth >= totalWidth - 10) {
        scrollTo(0);
        return true;
      }
      return false;
    }, [scrollTo]);

    const handleScrollBoundaries = useCallback(() => {
      const container = scrollRef.current;
      if (!container) return;

      const scrollPos = container.scrollLeft;
      const totalWidth = container.scrollWidth;
      const containerWidth = container.clientWidth;

      if (scrollPos + containerWidth >= totalWidth - 10) {
        container.style.scrollBehavior = "auto";
        scrollTo(0);
        setTimeout(() => {
          if (container) container.style.scrollBehavior = "smooth";
        }, 50);
      }
    }, [scrollTo]);

    const startScroll = useCallback(() => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }

      setIsScrolling(true);
    }, []);

    const stopScroll = useCallback(() => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      setIsScrolling(false);
      restartTimeoutRef.current = setTimeout(startScroll, pauseDuration);
    }, [startScroll, pauseDuration]);

    const resumeScroll = useCallback(() => {
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      startScroll();
    }, [startScroll]);

    // Touch handlers
    const handleTouchStart = (e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      stopScroll();
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const diff = touchStartX.current - touchEndX.current;
      if (Math.abs(diff) > 50) {
        if (diff > 0) scrollNext();
        else scrollPrev();
      }
      resumeScroll();
    };

    const scrollPrev = useCallback(() => {
      const container = scrollRef.current;
      if (container) {
        stopScroll();
        scrollTo(container.scrollLeft - CARD_WIDTH);
        if (!checkAndHandleEnd()) {
          restartTimeoutRef.current = setTimeout(startScroll, pauseDuration);
        } else {
          startScroll();
        }
      }
    }, [stopScroll, scrollTo, checkAndHandleEnd, startScroll, pauseDuration]);

    const scrollNext = useCallback(() => {
      const container = scrollRef.current;
      if (container) {
        stopScroll();
        scrollTo(container.scrollLeft + CARD_WIDTH);
        if (!checkAndHandleEnd()) {
          restartTimeoutRef.current = setTimeout(startScroll, pauseDuration);
        } else {
          startScroll();
        }
      }
    }, [stopScroll, scrollTo, checkAndHandleEnd, startScroll, pauseDuration]);

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          scrollPrev();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    useEffect(() => {
      setIsLoading(true);
      scrollTo(0);
      startScroll();
      setIsLoading(false);

      return () => {
        if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
        if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
      };
    }, [startScroll, scrollTo]);

    useEffect(() => {
      if (stopScrolls) stopScroll();
      if (resumeScrolls) resumeScroll();
    }, [stopScrolls, resumeScrolls, stopScroll, resumeScroll]);

    useEffect(() => {
      if (cards.length) {
        stopScroll();
        scrollTo(0);
        startScroll();
      }
    }, [cards, stopScroll, scrollTo, startScroll]);

    const handleMouseEnter = debounce(() => {
      if (isScrolling) stopScroll();
    }, 200);

    const handleMouseLeave = debounce(() => {
      if (!isScrolling) resumeScroll();
    }, 200);

    const handleAgentSelect = useCallback(
      (agent: CardInterface) => {
        stopScroll();
        window.location.href = `https://ravan.ai/${agent.route}`;
      },
      [stopScroll]
    );

    const handleDrag = (e: React.DragEvent) => {
      e.preventDefault();
    };

    return (
      <div
        className={`card-scroll-container relative ${className}`}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Card carousel"
      >
        {showRealEstateAgentVoice && (
          <RealEstateAgentVoice
            onClose={handleEnd}
            sessionStatus={sessionStatus}
            agentName={agentName}
          />
        )}

        <div className="navigation-controls relative">
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 shadow-md rounded-full w-10 h-10 flex items-center justify-center text-gray-800 hover:text-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={scrollPrev}
            aria-label="Previous card"
          >
            &lt;
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 shadow-md rounded-full w-10 h-10 flex items-center justify-center text-gray-800 hover:text-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={scrollNext}
            aria-label="Next card"
          >
            &gt;
          </button>
          <div
            className="card-scroll"
            ref={scrollRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onDrag={handleDrag}
            role="list"
          >
            {cards.map((card) => (
              <div key={card.id} className="card-item" role="listitem">
                <Card
                  card={card}
                  isActive={false}
                  handleStart={handleStart}
                  handleEnd={handleEnd}
                  getAgentName={setAgentName}
                  onAgentSelect={handleAgentSelect}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);