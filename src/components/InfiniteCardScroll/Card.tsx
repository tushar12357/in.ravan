import type { CardInterface } from "../../types";
import { Mic } from "lucide-react";
import "./Card.css";
interface CardProps {
  card: CardInterface;
  isActive: boolean;
  handleStart: (agent_code: string) => void;
  handleEnd: () => void;
  getAgentName: (agentName: string) => void;
  onAgentSelect?: (agent: CardInterface) => void;
}

export const Card: React.FC<CardProps> = ({
  card,
  isActive,
  handleStart,
  getAgentName,
  onAgentSelect,
}) => {
  const Icon = card.icon;
  const handleCardClick = () => {
    if (onAgentSelect) {
      onAgentSelect(card);
    }
  };
  return (
    <div
      className={`card ${isActive ? "active" : ""}`}
      onClick={handleCardClick}
    >
      {" "}
      <div
        className="card-icon-wrapper"
        style={{ backgroundColor: card.imageUrl }}
      >
        <Icon size={28} className="text-white" />
      </div>
      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{card.title}</h3>
          <p className="card-subtitle">USE CASE FOR</p>
        </div>
        <p className="card-description">{card.description}</p>
        <button
          className="try-demo-button"
          onClick={(e) => {
            e.preventDefault(); // Prevent default scroll behavior
            e.stopPropagation(); // Stop bubbling to card or parent scroll container

            handleStart(card.agent_code);
            getAgentName(card.title);
          }}
        >
          <Mic size={16} />
          Try Demo
        </button>
      </div>
    </div>
  );
};
