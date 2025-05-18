import { signOut } from "firebase/auth";
import { auth } from "./firebase"; 
import { useNavigate } from "react-router-dom";

function SignOutButton({ darkMode }) {
    const navigate = useNavigate();
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate("/")
            console.log("Signed out successfully");
        } catch (error) {
            console.error("Error signing out:", error.message);
        }
        };

        return (
        <button
            onClick={handleSignOut}
            style={{ padding: '10px 20px', backgroundColor: darkMode ? "#1f2937" : "#fff", color: darkMode ? " #9F67E0" : "#4285f4", border: darkMode ? "2px solid #9F67E0" : "2px solid #4285f4",  borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
            Sign Out
        </button>
    );
}

export default SignOutButton;
