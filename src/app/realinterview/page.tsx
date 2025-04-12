'use client';

import React, { useState } from 'react';
import { vapi } from '@/lib/vapi.sdk';
import { Loader2, Mic } from 'lucide-react';

const questions = {
  id: "demo-interview-123",
  userId: "user-001",
  role: "Frontend Developer",
  type: "Technical",
  techstack: ["React", "TypeScript", "TailwindCSS"],
  level: "Junior",
  questions: ["What is your name?", "What do you enjoy about coding?"],
  finalized: true,
  createdAt: new Date().toISOString(),
};

const baseInterviewer = {
  name: "Interviewer",
  firstMessage:
    "Hello! Thank you for taking the time to speak with me today. I'm excited to learn more about you and your experience.",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
  },
  voice: {
    provider: "11labs",
    voiceId: "sarah",
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.9,
    style: 0.5,
    useSpeakerBoost: true,
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a professional job interviewer conducting a real-time voice interview with a candidate. Your goal is to assess their qualifications, motivation, and fit for the role.

Interview Guidelines:
Follow the structured question flow:
{{questions}}

Engage naturally & react appropriately:
Listen actively to responses and acknowledge them before moving forward.
Ask brief follow-up questions if a response is vague or requires more detail.
Keep the conversation flowing smoothly while maintaining control.
Be professional, yet warm and welcoming:

Use official yet friendly language.
Keep responses concise and to the point (like in a real voice interview).
Avoid robotic phrasing—sound natural and conversational.
Answer the candidate’s questions professionally:

If asked about the role, company, or expectations, provide a clear and relevant answer.
If unsure, redirect the candidate to HR for more details.

Conclude the interview properly:
Thank the candidate for their time.
Inform them that the company will reach out soon with feedback.
End the conversation on a polite and positive note.

- Be sure to be professional and polite.
- Keep all your responses short and simple. Use official language, but be kind and welcoming.
- This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.`,
      },
    ],
  },
};

const InterviewReal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartInterview = async () => {
    setLoading(true);
    setError(null);

    try {
      // Format questions
      const questionList = questions.questions
        .map((q, index) => `${index + 1}. ${q}`)
        .join('\n');

      // Replace placeholder in prompt with real questions
      const updatedInterviewer = {
        ...baseInterviewer,
        model: {
          ...baseInterviewer.model,
          messages: [
            {
              ...baseInterviewer.model.messages[0],
              content: baseInterviewer.model.messages[0].content.replace(
                '{{questions}}',
                questionList
              ),
            },
          ],
        },
      };

      // Start interview
      await vapi.start(updatedInterviewer as any, {
        variableValues: {
          questions: questions,
        },
      });
    } catch (err: any) {
      console.error("Interview start error:", err);
      setError("Failed to start the interview. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-gray-900 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-slate-800">Start Interview</h1>
        <p className="text-gray-500">
          Role: <span className="font-semibold">{questions.role}</span> <br />
          Level: {questions.level} <br />
          Tech Stack: {questions.techstack.join(", ")}
        </p>

        {error && (
          <div className="text-red-600 bg-red-100 rounded-md p-2 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleStartInterview}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Starting...
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              Start Interview
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InterviewReal;
