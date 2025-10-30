import { useState } from "react";

const mockUsers = [
  { username: "manager1", password: "123456", role: "manager" },
  { username: "employee1", password: "qwerty", role: "employee" },
];

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {};

  return (
    <>
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </>
  );
}

export default Login;
