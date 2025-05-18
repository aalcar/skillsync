import React, { useState } from "react";

export default function Recommendations({ resumeKeywords }) {
  const [skill, setSkill] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [loading, setLoading] = useState(false);

  const getRecommendations = async (e) => {
    e.preventDefault();
    if (!skill) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/skill-recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skill,
          context: `Resume keywords: ${resumeKeywords.join(", ")}`,
        }),
      });

      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setRecommendations("There was an error generating recommendations.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <form onSubmit={getRecommendations} className="space-y-4">
        <input
          type="text"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          placeholder="Enter a skill (e.g., React)"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Generating..." : "Get recommendations!"}
        </button>
      </form>

      {recommendations && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-2">Advice:</h3>
          <p>{recommendations}</p>
        </div>
      )}
    </div>
  );
}
