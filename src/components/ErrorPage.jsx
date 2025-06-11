import React from "react";
import Lottie from "lottie-react";
import animationData from '../assets/Animation - 1749125602040.json'


const ErrorPage = () => {
  const handleGoHome = () => {
    // Replace "/" with your actual home route if different
    window.location.href = "/";
  };

  return (
    
    <div style={styles.container}>
      <div style={styles.content}>
       <Lottie
  loop={true}
  autoplay={true}
  animationData={animationData}
  style={{ height: "250px", margin: "0 auto" }}
/>

        <h1 style={styles.title}>404</h1>
        <p style={styles.subtitle}>Oops! You lost your way in WhereIsIt.</p>
        <p style={styles.text}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button style={styles.button} onClick={handleGoHome}>
          Go Back Home
        </button>
      </div>
      <div style={styles.animatedBackground}></div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  content: {
    zIndex: 2,
    textAlign: "center",
    maxWidth: "400px",
  },
  title: {
    fontSize: "8rem",
    margin: 0,
    fontWeight: "bold",
    animation: "pulse 2s infinite",
  },
  subtitle: {
    fontSize: "1.5rem",
    margin: "1rem 0 0.5rem",
  },
  text: {
    fontSize: "1rem",
    marginBottom: "2rem",
    color: "#ccc",
  },
  button: {
    backgroundColor: "#ff416c",
    backgroundImage: "linear-gradient(45deg, #ff416c, #ff4b2b)",
    border: "none",
    padding: "12px 30px",
    borderRadius: "30px",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
  animatedBackground: {
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    background:
      "radial-gradient(circle at center, #ff416c 0%, transparent 70%), radial-gradient(circle at center, #ff4b2b 20%, transparent 80%)",
    animation: "rotate 20s linear infinite",
    opacity: 0.15,
    zIndex: 1,
  },
};


export default ErrorPage;
