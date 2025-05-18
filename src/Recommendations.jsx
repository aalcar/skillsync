import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import RecommendationDisplay from "./RecommendationsDisplay";

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState("");
  const [loading, setLoading] = useState(true);
  const [resumeKeywords, setResumeKeywords] = useState([]);
  const [recommendationSteps, setRecommendationSteps] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchAndGenerate = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          setRecommendations("You must be signed in to view recommendations.");
          setLoading(false);
          return;
        }

        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (!docSnap.exists()) {
            setRecommendations("No resume keywords found. Please upload your resume first.");
            setLoading(false);
            return;
          }

          const keywords = docSnap.data().keywords || [];
          const jobKeywords = docSnap.data().job_keywords || [];
          setResumeKeywords(keywords);

          const response = await fetch("http://localhost:8000/skill-recommendations", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              skills: keywords.join(", "),
              keywordsFromJob: jobKeywords.join(", ")
            }),
          });

          const data = await response.json();
          setRecommendations(data.recommendations || data.advice || "");

          // Parse into title + steps
          const [titleLine, ...steps] = (data.recommendations || data.advice || "").split(/(?=Step \d+:)/);
          setTitle(titleLine.trim());
          setRecommendationSteps(steps.map(s => s.trim()));
        } catch (err) {
          console.error("Error:", err);
          setRecommendations("There was an error generating recommendations.");
        }

        setLoading(false);
      });
    };

    fetchAndGenerate();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Your Skill Recommendations
      </h2>
  
      {loading ? (
        <p className="text-center text-gray-500">Loading personalized recommendations...</p>
      ) : (
        <RecommendationDisplay rawText={recommendations} />
      )}
  
      {resumeKeywords.length > 0 && (
        <div className="mt-8">
          <h4 className="font-semibold text-gray-700 mb-2">Resume Keywords Used:</h4>
          <div className="flex flex-wrap gap-2">
            {resumeKeywords.map((kw, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-purple-400 to-blue-500 text-white font-medium shadow-sm"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );  
}
