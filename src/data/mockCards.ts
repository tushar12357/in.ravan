import type { CardInterface } from "../types";
import { Sun, Heart, Home, Gamepad, Briefcase, Paintbrush, Calendar, Shirt, Utensils, Users } from "lucide-react";

export const mockCards: CardInterface[] = [
  {
    id: 1,
    title: "Real Estate",
    route:'real-estate',
    description: "Residential Listings & Seller Leads",
    imageUrl: "#FF5722", // Primary Orange
    icon: Home, // Icon for real estate
    tags: ["Education", "Training"],
    agent_code: "4a35b22f-67fc-44aa-b416-ccd647cc8500",
  },
  {
    id: 2,
    title: "E-commerce",
    route:'e-commerce',
    description: "Product Recommendations & Sales Conversion",
    imageUrl: "#FF7043", // Light Orange
    icon: Shirt, // Icon for retail/e-commerce
    tags: ["Hotels", "Service"],
    agent_code: "d7ac6c9b-b5d9-4eb9-9950-9154fb32b163",
  },
  {
    id: 3,
    title: "Financial Services",
    route:'finance',
    description: "Mortgage Lenders & Loan Officers",
    imageUrl: "#FF3D00", // Deep Orange
    icon: Briefcase, // Icon for finance
    tags: ["Medical", "Health"],
    agent_code: "cd1e4e78-224c-41b6-ba5d-86f9d4037786",
  },
  {
    id: 4,
    title: "Tourism",
    route:'tourism',
    description: "Vacation Packages & Travel Agencies",
    imageUrl: "#FF6E40", // Bright Orange
    icon: Sun, // Icon for tourism
    tags: ["Property", "Management"],
    agent_code: "d137d402-8837-49f2-a79b-4362aee2efff",
  },
  {
    id: 5,
    title: "IT Solutions",
    route:'it',
    description: "Software, Hardware, & IT Support",
    imageUrl: "#FF8A65", // Soft Orange
    icon: Gamepad, // Icon for tech/IT
    tags: ["Entertainment", "Games"],
    agent_code: "42dca13d-820d-49c4-adc0-06f462ddcc29",
  },
  {
    id: 6,
    title: "Health & Wellness",
    route:'health',
    description: "Complete hospitality management solutions",
    imageUrl: "#FF8A65", // Soft Orange
    icon: Heart, // Icon for health
    tags: ["Entertainment", "Games"],
    agent_code: "21fb4b4d-5bfe-4438-8ed7-b2c84ebc165a",
  },
  {
    id: 7,
    title: "Home Improvement",
    route:'home-improvement',
    description: "Remodeling, HVAC, Landscaping",
    imageUrl: "#FF8A65", // Soft Orange
    icon: Paintbrush, // Icon for home improvement
    tags: ["Entertainment", "Games"],
    agent_code: "a6cd1b37-8a2c-49e7-b7f8-329178ef8dbe",
  },
  {
    id: 8,
    title: "Event Planning",
    route:'event-planning',
    description: "Weddings & Corporate Events",
    imageUrl: "#FF8A65", // Soft Orange
    icon: Calendar, // Icon for events
    tags: ["Entertainment", "Games"],
    agent_code: "f3bc4453-46f1-4b34-bb3a-f54b7071db39",
  },
  {
    id: 9,
    title: "Retail",
    route:'retail',
    description: "Fashion, Beauty, and Lifestyle",
    imageUrl: "#FF8A65", // Soft Orange
    icon: Shirt, // Icon for retail (shared with e-commerce, as both are retail-related)
    tags: ["Entertainment", "Games"],
    agent_code: "1f8ef39b-bd81-4830-90e0-dea0ecfe6ea7",
  },
  {
    id: 10,
    title: "Hospitality",
    route:'hospitality',
    description: "Restaurants & Catering",
    imageUrl: "#FF8A65", // Soft Orange
    icon: Utensils, // Icon for hospitality/food
    tags: ["Entertainment", "Games"],
    agent_code: "f4e67a33-324b-45ff-8ca8-336b3cffe34e",
  },
  {
    id: 11,
    title: "Recruitment",
    route:'recruitment',
    description: "Job Placement & Talent Acquisition",
    imageUrl: "#FF8A65", // Soft Orange
    icon: Users, // Icon for recruitment
    tags: ["Entertainment", "Games"],
    agent_code: "c8d5525a-5907-4bd0-8389-5574c88062c8",
  },
];