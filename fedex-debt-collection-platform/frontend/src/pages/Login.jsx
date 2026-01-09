import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Center from "../components/common/Center";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { theme } from "../styles/theme";

export default function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", { username });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      const role = res.data.role?.toLowerCase();
      if (role === 'collector') {
        navigate('/collector-dashboard');
      } else {
        navigate('/manager-dashboard');
      }
    } catch (err) {
      console.error(err);
      // Fallback for demo/dev if backend fails or doesn't return role
      if (username.toLowerCase().includes('collector')) {
        navigate('/collector-dashboard');
      } else {
        navigate('/manager-dashboard');
      }
    }
  };

  return (
    <Center>
      <div style={{ maxWidth: '400px', width: '100%', padding: theme.spacing.md }}>
        <Card title="Sign In" style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: theme.spacing.lg, color: theme.colors.text.secondary }}>
            Enter your username to access the Debt Collection Platform.
          </div>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username (e.g. manager, collector)"
            style={{
              width: '100%',
              padding: theme.spacing.md,
              marginBottom: theme.spacing.lg,
              borderRadius: theme.borderRadius.md,
              border: `1px solid ${theme.colors.border}`,
              backgroundColor: theme.colors.background,
              color: theme.colors.text.primary,
              outline: 'none'
            }}
          />
          <Button onClick={login} style={{ width: '100%' }}>Login</Button>
        </Card>
      </div>
    </Center>
  );
}
