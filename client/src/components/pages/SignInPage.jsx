import { API_URL } from "../../api";
import { useState } from "react";
import "./SignInPage.css";

function SignIn({ onSignIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${API_URL}/users?username=${username}&password=${password}`
      );
      const users = await res.json();

      if (users.length > 0) {
        setErrorMessage("");
        onSignIn(users[0]);
      } else {
        setErrorMessage("Invalid username or password");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="sign-in-page">
        <form onSubmit={handleSignIn}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
          <span className="error-message">{errorMessage}</span>
          <button type="submit" className="primary">
            Sign In
          </button>
        </form>
      </div>
    </>
  );
}

export default SignIn;
