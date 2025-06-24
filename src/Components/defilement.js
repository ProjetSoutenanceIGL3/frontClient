import "./../style/ScrollingBar.css"; // Fichier CSS séparé
const ScrollingBar = () => {
  const subjects = [
    "MATHS",
    "FRANCAIS",
    "PCT",
    "PHYSIQUE",
    "CHIMIE",
    "PHILOSOPHIE",
    "HISTOIRE",
  ];

  return (
    <div className="scrolling-container">
      <div className="scrolling-wrapper">
        {/* Premier ensemble */}
        <div className="scrolling-content">
          {subjects.map((subject, index) => (
            <span className="subject-item" key={`first-${index}`}>
              {subject}
            </span>
          ))}
        </div>
        {/* Deuxième ensemble (dupliqué pour la continuité) */}
        <div className="scrolling-content">
          {subjects.map((subject, index) => (
            <span className="subject-item" key={`second-${index}`}>
              {subject}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingBar;
