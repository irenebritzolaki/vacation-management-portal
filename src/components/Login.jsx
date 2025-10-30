import { useState } from "react";

const mockUsers = [
  { username: "manager1", password: "123456", role: "manager" },
  { username: "employee1", password: "qwerty", role: "employee" },
];

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      setErrorMessage("");
      if (user.role === "manager") alert("You are logged in as a manager");
      else alert("You are logged in as an employee");
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <>
      <div className="login-container">
        <form onSubmit={handleLogin}>
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
          <span class="error-message">{errorMessage}</span>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </>
  );
}

export default Login;
