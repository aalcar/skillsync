import React, { useEffect, useState } from "react";
import { useAuth } from "./hooks/useAuth.js";
import PdfUploader from "./PDFUploader.jsx";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

function Profile({ darkMode }) {
  const { user, loading } = useAuth();
  const [keywords, setKeywords] = useState([]);

  const saveKeywordsToFirestore = async (keywordsSet) => {
    if (!user) return;

    const keywordArray = Array.from(keywordsSet);

    try {
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, { keywords: keywordArray }, { merge: true });
      console.log("Keywords saved to Firestore:", keywordArray);
      setKeywords(keywordArray); // update local state after saving
    } catch (error) {
      console.error("Error saving keywords:", error);
    }
  };

  const fetchKeywords = async () => {
    if (!user) return;

    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.keywords) {
          setKeywords(data.keywords);
        }
      } else {
        console.log("No keyword data found for user.");
      }
    } catch (error) {
      console.error("Error fetching keywords:", error);
    }
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/upload-resume", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const keywordSet = new Set(data.keywords.map(([k]) => k));
      await saveKeywordsToFirestore(keywordSet);
    } catch (error) {
      console.error("Resume upload failed:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchKeywords();
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please sign in.</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "15px" }}>
      <PdfUploader onUpload={handleUpload} />
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <h2 style={{
            fontSize: "1.5rem",
            color: darkMode ? "#f8f9fa" : "#374151",
            marginBottom: "12px"
        }}>
            Extracted Keywords
        </h2>

        {keywords.length > 0 ? (
            <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "12px",
                maxWidth: "600px",
                margin: "0 auto"
            }}
            >
            {keywords.map((keyword, idx) => (
                <div
                key={idx}
                style={{
                    padding: "8px 16px",
                    borderRadius: "20px",
                    backgroundColor: darkMode ? "#4B5563" : "#E5E7EB",
                    color: darkMode ? "#f8f9fa" : "#1F2937",
                    fontSize: "0.95rem",
                    fontWeight: "500",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    transition: "transform 0.2s ease",
                    cursor: "default"
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                }}
                >
                {keyword}
                </div>
            ))}
            </div>
        ) : (
            <p style={{ color: darkMode ? "#9CA3AF" : "#6B7280" }}>No keywords found yet.</p>
        )}
        </div>
    </div>
  );
}

export default Profile;
