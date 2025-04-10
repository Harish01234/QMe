"use server";

import { db } from "@/firebase/admin";

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
