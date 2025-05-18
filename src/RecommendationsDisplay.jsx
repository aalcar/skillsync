import React from "react";

function parseRecommendations(text) {
    if (!text || text.trim().length === 0) {
      return { intro: "", sections: [], fallback: "" };
    }
  
    const [introRaw, ...rest] = text.split(/(?=1\.\s+\*\*)/s);
    const intro = introRaw.trim();
  
    const stepRegex = /\d+\.\s+\*\*(.*?)\*\*:(.*?)(?=\d+\.\s+\*\*|$)/gs;
    const matches = [...text.matchAll(stepRegex)];
  
    const sections = matches.map(match => {
      const title = match[1]?.trim() ?? "Untitled Section";
      const rawContent = match[2]?.trim() ?? "";
  
      const bullets = [];
      let projectIdea = "";
  
      rawContent.split(/\n|(?=- )/g).forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith("- ")) {
          bullets.push(trimmed.replace(/^- /, ""));
        } else if (/^project idea:/i.test(trimmed)) {
          projectIdea = trimmed.replace(/project idea:\s*/i, "");
        }
      });
  
      return {
        title,
        bullets,
        projectIdea,
      };
    });
  
    // If regex didn't match any steps, treat entire thing as fallback
    const fallback = sections.length === 0 ? text : "";
  
    return { intro, sections, fallback };
}  

export default function RecommendationDisplay({ rawText }) {
    const { intro, sections, fallback } = parseRecommendations(rawText);

    if (!rawText) {
      return (
        <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded">
          <p>No recommendations found.</p>
        </div>
      );
    }
    
    if (fallback) {
      return (
        <div className="p-6 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded">
          <h3 className="font-semibold mb-2">AI Response (Unstructured):</h3>
          <p className="whitespace-pre-line">{fallback}</p>
        </div>
      );
    }
    
    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-6 space-y-6">
        {intro && (
          <div className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            <p>{intro}</p>
          </div>
        )}
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-2">
            <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400">
              {section.title}
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-200">
              {section.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
            {section.projectIdea && (
              <p className="text-sm italic text-gray-600 dark:text-gray-400 mt-1">
                💡 Project idea: {section.projectIdea}
              </p>
            )}
          </div>
        ))}
      </div>
    );
}    