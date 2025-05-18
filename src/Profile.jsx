import React, { useEffect, useState } from "react";
import PdfUploader from "./PDFUploader.jsx";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // optional if using user-specific data
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function Profile({ darkMode }) {
    const db = getFirestore();

    function useAuthStatus() {
        const [user, setUser] = useState(null);
      
        useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user); // null if not signed in
          });
      
          return () => unsubscribe(); // clean up
        }, []);
      
        return user;
      }

    async function saveKeywords(keywords) {
      const userId = getAuth().currentUser.uid; // assumes user is logged in
      await setDoc(doc(db, "users", userId), {
        keywords: keywords,
        timestamp: Date.now()
      });
    }

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
        saveKeywords(keywordSet)
        } catch (error) {
        console.error("Resume upload failed:", error);
        }
    };

  return (
    <>
        <div style={{ textAlign: "center", marginTop: "15px" }}>
            <button
                style={{
                border: "none",
                background: "none",
                color: darkMode ? "#9F67E0" : "#4285f4",
                cursor: "pointer",
                fontSize: "11px",
            }}
          >
            <PdfUploader onUpload={handleUpload} />
          </button>
        </div>
    </>
  );
}

export default Profile;
