import { useState, useEffect, useRef } from "react";
import { WidgetDemo } from "./components/WidgetDemo";
import { InfiniteCardScroll } from "./components/InfiniteCardScroll/InfiniteCardScroll";
import { mockCards } from "./data/mockCards";
import { UltravoxSession } from "ultravox-client";
import axios from "axios";
import partnerLogo from "../public/cropped-iam-logo-1.png"; // Adjust the path to your image

// Mapping of language codes to agentIds for Video Widget
const videoWidgetAgentIds = {
  en: "ca9b354f-41a7-46ab-8e6d-8c56b6a1e727", // English
  hi: "5b9d7ca0-547c-4c74-b07c-59df751d74c8", // Hindi
  es: "4d8bec16-562a-4125-b86e-aba31e70759d", // Spanish
  fr: "cfdb1510-904f-4fdc-8858-8fc09f9afe34", // French
  de: "3f7ebb25-c854-4c11-961e-2c76c4f98e12", // German
  mr: "",
};

const widgets = [
  {
    title: "Video Widget",
    description:
      "A widget for video-related interactions with customizable features and real-time communication capabilities.",
    tagName: "react-widget-rvw",
    schema: "09483b13-47ac-47b2-95cf-4ca89b3debfa",
  },
  {
    title: "AI Calling Widget",
    description:
      "A widget designed for AI-driven calling functionalities with voice recognition and automated responses.",
    tagName: "react-widget-ai",
    agentId: "bd204830-afcb-4dbb-881c-4f7b2d00dd95",
    schema: "21babbd4-cd63-4763-9b08-671951c04470",
    type: "customwidget",
  },
  {
    title: "Multi-Thunder Widget",
    description:
      "A versatile widget for multiple AI-driven use cases including analytics, automation, and customer support.",
    tagName: "react-widget-maic",
    agentId: "bd204830-afcb-4dbb-881c-4f7b2d00dd95",
    schema: "21babbd4-cd63-4763-9b08-671951c04470",
    type: "customwidget",
  },
];

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [callId, setCallId] = useState(null);
  const [sessionStatus, setSessionStatus] = useState(null);
  const [callSessionId, setCallSessionId] = useState(null);
  const [stopScrolls, setStopScrolls] = useState(false);
  const [resumeScrolls, setResumeScrolls] = useState(false);
  const [showRealEstateAgentVoice, setShowRealEstateAgentVoice] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language
  const sessionRef = useRef(null);

  if (!sessionRef.current) {
    sessionRef.current = new UltravoxSession();
  }

  useEffect(() => {
    setIsLoaded(true);

    const handleStatus = (event) => {
      console.log("Session status changed: ", event);
      setSessionStatus(sessionRef.current?.status);
    };

    sessionRef.current?.addEventListener("status", handleStatus);

    return () => {
      sessionRef.current?.removeEventListener("status", handleStatus);
    };
  }, []);

  useEffect(() => {
    if (sessionStatus === "disconnected") {
      handleEnd();
      setShowRealEstateAgentVoice(false);
    }
  }, [sessionStatus]);

  const handleStart = async (agent_code) => {
    if (sessionStatus !== "disconnected") {
      await handleEnd();
    }

    try {
      if (!isListening) {
        const response = await axios.post(
          `https://app.snowie.ai/api/start-thunder/`,
          {
            agent_code: agent_code,
            schema_name: "6af30ad4-a50c-4acc-8996-d5f562b6987f",
          }
        );
        setStopScrolls(true);
        setShowRealEstateAgentVoice(true);
        const wssUrl = response.data.joinUrl;
        setCallId(response.data.callId);
        setCallSessionId(response.data.call_session_id);

        if (wssUrl) {
          console.log("wssUrl", wssUrl);
          sessionRef.current?.joinCall(`${wssUrl}`);
        }
        setIsListening(true);
      } else {
        await sessionRef.current?.leaveCall();
        setShowRealEstateAgentVoice(false);
        const response = await axios.post(
          `https://app.snowie.ai/api/end-call-session-thunder/`,
          {
            call_session_id: callSessionId,
            call_id: callId,
            schema_name: "6af30ad4-a50c-4acc-8996-d5f562b6987f",
          }
        );
        setIsListening(false);
      }
    } catch (error) {
      console.error("Error in handleStart:", error);
    }
  };

  const handleEnd = async () => {
    await sessionRef.current?.leaveCall();
    setStopScrolls(false);
    setShowRealEstateAgentVoice(false);
    setIsListening(false);
  };

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "hi", label: "Hindi" },
  ];

  console.log(videoWidgetAgentIds[selectedLanguage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <header className="text-center mb-16 lg:mb-20">
            <h1
              className="text-6xl sm:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6"
              style={{ paddingTop: "5rem" }}
            >
              Widgets Showcase - Ravan.ai
            </h1>
          </header>
          <main className="space-y-16 lg:space-y-20">
            {widgets.map((widget, index) => (
              <div
                key={index}
                className={`transform transition-all duration-700 ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 300}ms` }}
              >
                <div className="text-center mb-8 lg:mb-10 pt-4 pb-2">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    {widget.title}
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
                    {widget.description}
                  </p>
                </div>
                {widget.title === "Video Widget" && (
                  <div className="mb-6 flex justify-center">
                    <div className="relative inline-block w-48">
                      <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="w-full px-4 py-3 text-gray-700 bg-white rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:shadow-lg cursor-pointer"
                      >
                        {languageOptions.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            className="text-gray-700 bg-white hover:bg-orange-100"
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
                <div className="relative group">
                  <div className="bg-white/90 bg-gradient-to-br from-white to-orange-50 rounded-2xl p-6 sm:p-8 lg:p-10">
                    {widget.title === "Multi-Thunder Widget" ? (
                      <InfiniteCardScroll
                        cards={mockCards}
                        handleStart={handleStart}
                        handleEnd={handleEnd}
                        stopScrolls={stopScrolls}
                        resumeScrolls={resumeScrolls}
                        showRealEstateAgentVoice={showRealEstateAgentVoice}
                        sessionStatus={sessionStatus}
                      />
                    ) : (
                      <WidgetDemo
                        tagName={widget.tagName}
                        agentId={
                          widget.title === "Video Widget"
                            ? videoWidgetAgentIds[selectedLanguage] || videoWidgetAgentIds["en"]
                            : widget.agentId
                        }
                        schema={widget.schema}
                        type={widget.type}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </main>
          {/* New Pricing Contact Section */}
          <section className="text-center mt-16 lg:mt-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              For Pricing, Contact Below - Exclusive Partner for India
            </h2>
            <div className="flex justify-center">
              <img
                src={partnerLogo}
                alt="Exclusive Partner for India"
                className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto mt-6 rounded-lg shadow-md"
              />
            </div>
          </section>
        </div>
      </div>
      <div className="p-6 sm:p-8">
        <WidgetDemo
          tagName="react-widget-uv"
          agentId="5f29901d-93d1-48d9-a9bd-d0c6525d26ac"
          schema="6af30ad4-a50c-4acc-8996-d5f562b6987f"
        />
      </div>
    </div>
  );
}

export default App;