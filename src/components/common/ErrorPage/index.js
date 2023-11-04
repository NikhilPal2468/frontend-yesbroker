import React from "react";
import { Link } from "react-router-dom"; // If you're using React Router

const ErrorPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Not Found</h1>
      <p style={styles.text}>
        The page you are looking for does not exist. Please return to the{" "}
        <Link to="/" style={styles.link}>
          Home Page
        </Link>
        .
      </p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    paddingTop: "100px",
  },
  title: {
    fontSize: "3rem",
    color: "#333",
  },
  text: {
    fontSize: "1.5rem",
    color: "#666",
  },
  link: {
    textDecoration: "none",
    color: "#007BFF",
  },
};

export default ErrorPage;
