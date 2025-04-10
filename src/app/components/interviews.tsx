"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/client";
import { CheckCircle, XCircle, Calendar, Briefcase, Code } from "lucide-react";

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getAllInterviews = async () => {
    try {
      const snapshot = await getDocs(collection(db, "interviews"));
      const results = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInterviews(results);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllInterviews();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center p-12 min-h-64 bg-gray-800">
      <div className="animate-pulse text-indigo-400 text-xl font-medium">Loading interviews...</div>
    </div>
  );

  return (
    <section className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Your Mock Interviews</h2>
          <p className="mt-4 text-lg text-gray-300">
            Review and continue your practice sessions
          </p>
        </div>
        
        {interviews.length === 0 ? (
          <div className="text-center py-8 bg-gray-900 rounded-xl border border-gray-700">
            <p className="text-gray-300 text-lg">No interviews found. Create your first mock interview!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {interviews.map((interview) => (
              <div
                key={interview.id}
                className="bg-gray-900 rounded-xl border border-gray-700 p-6 hover:border-indigo-500 transition-all duration-300 shadow-lg"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar size={16} className="mr-1" />
                    {new Date(interview.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    interview.finalized ? "bg-emerald-900 text-emerald-300" : "bg-amber-900 text-amber-300"
                  }`}>
                    {interview.finalized ? "Completed" : "In Progress"}
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-white mb-1">{interview.role}</h2>
                <div className="flex items-center mb-3">
                  <Briefcase size={16} className="text-indigo-400 mr-1" />
                  <p className="text-sm text-gray-300">
                    {interview.level} • {interview.type}
                  </p>
                </div>

                {interview.techstack?.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <Code size={16} className="text-emerald-400 mr-1" />
                      <p className="text-sm font-medium text-gray-200">Tech Stack</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {interview.techstack.map((tech: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-gray-800 text-xs rounded-md text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-200 mb-2">Questions</p>
                  <ul className="space-y-2">
                    {interview.questions?.slice(0, 3).map((q: string, i: number) => (
                      <li key={i} className="text-sm text-gray-300 pl-3 border-l-2 border-indigo-500">
                        {q.length > 80 ? `${q.substring(0, 80)}...` : q}
                      </li>
                    ))}
                    {interview.questions?.length > 3 && (
                      <li className="text-xs text-indigo-400 mt-1">
                        +{interview.questions.length - 3} more questions
                      </li>
                    )}
                  </ul>
                </div>

                <div className="flex justify-end mt-2">
                  <button className="px-4 py-2 bg-indigo-600 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">
                    {interview.finalized ? "Review" : "Continue"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}