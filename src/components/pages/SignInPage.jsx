import { useState } from "react";

const mockUsers = [
  { username: "manager1", password: "123456", role: "manager" },
  { username: "employee1", password: "qwerty", role: "employee" },
];

function SignIn({ onSignIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();

    const user = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      setErrorMessage("");
      onSignIn(user);
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <>
      <div className="sign-in-container">
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
          <button type="submit">Sign In</button>
        </form>
      </div>
    </>
  );
}

export default SignIn;
