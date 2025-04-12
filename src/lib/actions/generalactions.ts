"use server";

import { feedbackSchema } from "@/constants";
import { db } from "@/firebase/admin";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";

export async function getAllInterviews() {
  try {
    const snapshot = await db.collection("interviews").get();

    const interviews = snapshot.docs.map((doc) => ({
      id: doc.id,
      createdAt: doc.data().createdAt,
      finalized: doc.data().finalized,
      level: doc.data().level,
      questions: doc.data().questions,
      role: doc.data().role,
      techstack: doc.data().techstack,
      type: doc.data().type,
      userId: doc.data().userId
    }));

    return interviews;
  } catch (error) {
    console.error("Failed to fetch interviews:", error);
    throw new Error("Something went wrong while fetching interviews.");
  }
}

export interface Interview {
  id: string;
  userId: string;
  role: string;
  type: string;
  techstack: string[];
  level: string;
  questions: string[];
  finalized: boolean;
  createdAt: string;
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await db.collection("interviews").doc(id).get();

  return interview.data() as Interview | null;
}
interface CreateFeedbackParams {
  interview: Interview;
  transcript: { role: string; content: string }[];
  feedbackId?: string;
  userId: string;
}

export async function createFeedback(params: CreateFeedbackParams) {
  const { interview, transcript, feedbackId, userId } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const prompt = `
      You are an AI interviewer analyzing a mock interview for the role of **${interview.role}** at **${interview.level}** level.
      The interview type is **${interview.type}** and the required tech stack includes: ${interview.techstack.join(", ")}.
      
      Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient. If there are mistakes or areas for improvement, point them out.

      Transcript:
      ${formattedTranscript}

      Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
      - **Communication Skills**: Clarity, articulation, structured responses.
      - **Technical Knowledge**: Understanding of key concepts for the role.
      - **Problem-Solving**: Ability to analyze problems and propose solutions.
      - **Cultural & Role Fit**: Alignment with company values and job role.
      - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
    `;

    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories.",
    });

    const feedback = {
      interviewId: interview.id,
      userId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      finalAssessment: object.finalAssessment,
      createdAt: new Date().toISOString(),
    };

    const feedbackRef = feedbackId
      ? db.collection("feedback").doc(feedbackId)
      : db.collection("feedback").doc();

    await feedbackRef.set(feedback);

    return { success: true, feedbackId: feedbackRef.id };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return { success: false };
  }
}
