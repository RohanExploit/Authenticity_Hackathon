import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");

  const login = async () => {
    const res = await axios.post("http://localhost:5000/api/login", { username });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);
    window.location = "/dashboard";
  };

  return (
    <div>
      <h2>Login</h2>
      <input onChange={e => setUsername(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}
