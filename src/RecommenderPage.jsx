import Recommendations from "./Recommendations";
import Header from "./Header";

const RecommenderPage = ({ darkMode, toggleTheme }) => {
    return (
      <div>
        {/* Keep Header and Search Bar Full Width */}
        <Header darkMode={darkMode} toggleTheme={toggleTheme} />
        <Recommendations darkMode={darkMode} />
      </div>
    );
  };
  
  export default RecommenderPage;