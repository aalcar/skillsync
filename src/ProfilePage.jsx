import Profile from "./Profile";
import Header from "./Header";

const ProfilePage = ({ darkMode, toggleTheme }) => {
    return (
      <div>
        {/* Keep Header and Search Bar Full Width */}
        <Header darkMode={darkMode} toggleTheme={toggleTheme} />
        <Profile darkMode={darkMode} />
      </div>
    );
  };
  
  export default ProfilePage;