import React from "react";
import { createFeedback } from "@/lib/actions/generalactions";

const page = async () => {
  // Dummy interview object
  const demoInterview = {
    id: "demo-interview-123",
    userId: "user-001",
    role: "Frontend Developer",
    type: "Technical",
    techstack: ["React", "TypeScript", "TailwindCSS"],
    level: "Junior",
    questions: ["Tell me about your recent project.", "What is useEffect?"],
    finalized: true,
    createdAt: new Date().toISOString(),
  };

  // Dummy transcript (role can be 'interviewer' or 'candidate')
  const demoTranscript = [
    {
      role: "interviewer",
      content: "Can you introduce yourself and talk about your background?",
    },
    {
      role: "candidate",
      content: "I'm a frontend developer with 2 years of experience in React.",
    },
    {
      role: "interviewer",
      content: "What is useEffect and when would you use it?",
    },
    {
      role: "candidate",
      content:
        "useEffect is a React Hook used to run side effects like data fetching, DOM updates, etc.",
    },
  ];

  // Call your function with dummy data
  const result = await createFeedback({
    interview: demoInterview,
    transcript: demoTranscript,
    userId: demoInterview.userId,
  });

  console.log("Generated Feedback:", result);

  return <div>Check your console for the generated feedback 👀</div>;
};

export default page;
