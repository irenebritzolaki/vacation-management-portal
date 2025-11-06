import { API_URL } from "../../api";
import { useState } from "react";
import "./SignInPage.css";
import bcrypt from "bcryptjs";

function SignIn({ onSignIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/users?username=${username}`);
      const users = await res.json();

      if (users.length === 0) {
        setErrorMessage("Invalid username or password");
        return;
      }

      const user = users[0];
      const passwordMatches = await bcrypt.compare(password, user.password);

      if (!passwordMatches) {
        setErrorMessage("Invalid username or password");
        return;
      }

      onSignIn(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      setErrorMessage("Something went wrong.");
    }
  };

  return (
    <>
      <div className="sign-in-page">
        <form onSubmit={handleSignIn}>
          <input
            type="text"
            value={username}
            title="Please give your username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            required
          />
          <div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              title="Please give your password"
              placeholder="password"
              required
            />
            <label className="show-password">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>
          </div>
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
