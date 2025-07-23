import React from 'react';
import { ArrowLeft, Mic, Star, Users, Clock, Award } from 'lucide-react';
import type { CardInterface } from '../../types';
import './AgentDetail.css';

interface AgentDetailProps {
  agent: CardInterface;
  onBack: () => void;
  handleStart: (agent_code: string) => void;
  handleEnd: () => void;
  getAgentName: (agentName: string) => void;
}

const agentDetails = {
  "Real Estate": {
    fullDescription: "Our Real Estate AI Agent specializes in residential property listings, lead generation, and client qualification. Perfect for real estate professionals looking to automate initial client interactions and property inquiries.",
    features: [
      "Property listing management",
      "Lead qualification and scoring",
      "Appointment scheduling",
      "Market analysis insights",
      "Client follow-up automation"
    ],
    useCases: [
      "Qualify potential buyers and sellers",
      "Schedule property viewings",
      "Provide market information",
      "Generate and nurture leads",
      "Handle initial client inquiries"
    ],
    stats: {
      satisfaction: "94%",
      responseTime: "< 2 seconds",
      leadsGenerated: "2,500+"
    }
  },
  "E-commerce": {
    fullDescription: "Our E-commerce AI Agent enhances online shopping experiences with personalized product recommendations, order assistance, and customer support automation.",
    features: [
      "Product recommendation engine",
      "Order tracking and support",
      "Inventory management alerts",
      "Customer behavior analysis",
      "Abandoned cart recovery"
    ],
    useCases: [
      "Personalized shopping assistance",
      "Order status inquiries",
      "Product comparisons",
      "Return and refund processing",
      "Upselling and cross-selling"
    ],
    stats: {
      satisfaction: "92%",
      responseTime: "< 1 second",
      conversions: "35% increase"
    }
  },
  "Financial Services": {
    fullDescription: "Our Financial Services AI Agent assists with loan applications, mortgage inquiries, and financial consultations, streamlining the customer journey in financial services.",
    features: [
      "Loan pre-qualification",
      "Mortgage calculation tools",
      "Credit score analysis",
      "Investment guidance",
      "Compliance monitoring"
    ],
    useCases: [
      "Mortgage pre-approval process",
      "Loan application assistance",
      "Financial planning consultations",
      "Insurance quote generation",
      "Investment portfolio reviews"
    ],
    stats: {
      satisfaction: "96%",
      responseTime: "< 3 seconds",
      applications: "1,800+"
    }
  },
  "Tourism": {
    fullDescription: "Our Tourism AI Agent helps travelers plan perfect vacations with personalized recommendations, booking assistance, and travel support throughout their journey.",
    features: [
      "Destination recommendations",
      "Itinerary planning",
      "Booking management",
      "Local insights and tips",
      "Emergency travel support"
    ],
    useCases: [
      "Vacation package recommendations",
      "Flight and hotel bookings",
      "Local activity suggestions",
      "Travel insurance guidance",
      "Real-time travel updates"
    ],
    stats: {
      satisfaction: "93%",
      responseTime: "< 2 seconds",
      bookings: "3,200+"
    }
  },
  "IT Solutions": {
    fullDescription: "Our IT Solutions AI Agent provides technical support, software recommendations, and IT consultation services for businesses and individuals.",
    features: [
      "Technical troubleshooting",
      "Software recommendations",
      "System optimization tips",
      "Security assessments",
      "Hardware compatibility checks"
    ],
    useCases: [
      "IT support ticket resolution",
      "Software selection guidance",
      "System performance optimization",
      "Cybersecurity consultations",
      "Hardware upgrade recommendations"
    ],
    stats: {
      satisfaction: "91%",
      responseTime: "< 1 second",
      tickets: "5,000+"
    }
  },
  "Health & Wellness": {
    fullDescription: "Our Health & Wellness AI Agent provides health information, appointment scheduling, and wellness guidance while maintaining strict privacy and compliance standards.",
    features: [
      "Symptom assessment",
      "Appointment scheduling",
      "Wellness recommendations",
      "Medication reminders",
      "Health tracking integration"
    ],
    useCases: [
      "Initial health consultations",
      "Wellness program enrollment",
      "Appointment booking",
      "Health information queries",
      "Preventive care reminders"
    ],
    stats: {
      satisfaction: "95%",
      responseTime: "< 2 seconds",
      consultations: "4,100+"
    }
  },
  "Home Improvement": {
    fullDescription: "Our Home Improvement AI Agent connects homeowners with contractors, provides project estimates, and guides through renovation processes.",
    features: [
      "Project cost estimation",
      "Contractor matching",
      "Material recommendations",
      "Timeline planning",
      "Quality assurance checks"
    ],
    useCases: [
      "Renovation project planning",
      "Contractor vetting and selection",
      "Material cost calculations",
      "Project timeline management",
      "Quality control monitoring"
    ],
    stats: {
      satisfaction: "89%",
      responseTime: "< 3 seconds",
      projects: "1,500+"
    }
  },
  "Event Planning": {
    fullDescription: "Our Event Planning AI Agent assists with wedding and corporate event planning, vendor coordination, and event management from concept to execution.",
    features: [
      "Venue recommendations",
      "Vendor coordination",
      "Budget management",
      "Timeline creation",
      "Guest management"
    ],
    useCases: [
      "Wedding planning assistance",
      "Corporate event coordination",
      "Vendor selection and booking",
      "Budget optimization",
      "Event day management"
    ],
    stats: {
      satisfaction: "97%",
      responseTime: "< 2 seconds",
      events: "800+"
    }
  },
  "Retail": {
    fullDescription: "Our Retail AI Agent enhances in-store and online shopping experiences with personalized assistance, inventory management, and customer service automation.",
    features: [
      "Personal shopping assistance",
      "Inventory tracking",
      "Style recommendations",
      "Size and fit guidance",
      "Loyalty program management"
    ],
    useCases: [
      "Personal styling consultations",
      "Product availability checks",
      "Size and fit recommendations",
      "Loyalty program enrollment",
      "Return and exchange processing"
    ],
    stats: {
      satisfaction: "90%",
      responseTime: "< 1 second",
      interactions: "6,200+"
    }
  },
  "Hospitality": {
    fullDescription: "Our Hospitality AI Agent manages restaurant reservations, catering orders, and customer service for the food and beverage industry.",
    features: [
      "Reservation management",
      "Menu recommendations",
      "Dietary restriction handling",
      "Order processing",
      "Customer feedback collection"
    ],
    useCases: [
      "Restaurant reservation booking",
      "Catering order management",
      "Menu item recommendations",
      "Special dietary accommodations",
      "Customer service inquiries"
    ],
    stats: {
      satisfaction: "94%",
      responseTime: "< 2 seconds",
      reservations: "3,800+"
    }
  },
  "Recruitment": {
    fullDescription: "Our Recruitment AI Agent streamlines the hiring process with candidate screening, interview scheduling, and talent acquisition support.",
    features: [
      "Resume screening",
      "Candidate matching",
      "Interview scheduling",
      "Skills assessment",
      "Onboarding assistance"
    ],
    useCases: [
      "Initial candidate screening",
      "Job matching and recommendations",
      "Interview coordination",
      "Skills and competency testing",
      "New hire onboarding"
    ],
    stats: {
      satisfaction: "88%",
      responseTime: "< 2 seconds",
      placements: "1,200+"
    }
  }
};

export const AgentDetail: React.FC<AgentDetailProps> = ({
  agent,
  onBack,
  handleStart,
  handleEnd,
  getAgentName
}) => {
  const Icon = agent.icon;
  const details = agentDetails[agent.title as keyof typeof agentDetails];

  const handleTryDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleStart(agent.agent_code);
    getAgentName(agent.title);
  };

  return (
    <div className="agent-detail-container">
      <div className="agent-detail-header">
        <button 
          className="back-button"
          onClick={onBack}
          aria-label="Back to agents"
        >
          <ArrowLeft size={20} />
          <span>Back to Agents</span>
        </button>
      </div>

      <div className="agent-detail-content">
        <div className="agent-hero">
          <div 
            className="agent-hero-icon"
            style={{ backgroundColor: agent.imageUrl }}
          >
            <Icon size={48} className="text-white" />
          </div>
          <div className="agent-hero-info">
            <h1 className="agent-title">{agent.title}</h1>
            <p className="agent-subtitle">AI Agent</p>
            <p className="agent-description">{agent.description}</p>
          </div>
          <button 
            className="try-demo-hero-button"
            onClick={handleTryDemo}
          >
            <Mic size={20} />
            Try Demo Now
          </button>
        </div>

        {details && (
          <>
            <div className="agent-stats">
              <div className="stat-card">
                <Star className="stat-icon" />
                <div className="stat-content">
                  <div className="stat-value">{details.stats.satisfaction}</div>
                  <div className="stat-label">Satisfaction Rate</div>
                </div>
              </div>
              <div className="stat-card">
                <Clock className="stat-icon" />
                <div className="stat-content">
                  <div className="stat-value">{details.stats.responseTime}</div>
                  <div className="stat-label">Response Time</div>
                </div>
              </div>
              <div className="stat-card">
                <Users className="stat-icon" />
                <div className="stat-content">
                  <div className="stat-value">{Object.values(details.stats)[2]}</div>
                  <div className="stat-label">Success Metric</div>
                </div>
              </div>
            </div>

            <div className="agent-details-grid">
              <div className="detail-section">
                <h2 className="section-title">
                  <Award size={24} />
                  About This Agent
                </h2>
                <p className="section-description">{details.fullDescription}</p>
              </div>

              <div className="detail-section">
                <h2 className="section-title">Key Features</h2>
                <ul className="feature-list">
                  {details.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <div className="feature-bullet"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="detail-section">
                <h2 className="section-title">Use Cases</h2>
                <ul className="use-case-list">
                  {details.useCases.map((useCase, index) => (
                    <li key={index} className="use-case-item">
                      <div className="use-case-number">{index + 1}</div>
                      {useCase}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="cta-section">
              <h2>Ready to Experience This Agent?</h2>
              <p>Click the button below to start an interactive demo and see how this AI agent can transform your business.</p>
              <button 
                className="cta-button"
                onClick={handleTryDemo}
              >
                <Mic size={20} />
                Start Interactive Demo
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};