// Components/Login.tsx (or .tsx)
import styles from "./styles.module.scss";

export const LoginPage = () => {
  return (
    <div className={styles.loginScreen}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "2rem",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <h1>Welcome to Noted</h1>
        <p>Please log in to continue</p>
        {/* Add your login form here later */}
        <button
          style={{
            padding: "10px 20px",
            fontSize: "1.2rem",
            marginTop: "20px",
          }}
        >
          Log In (coming soon)
        </button>
      </div>
    </div>
  );
};
