import "./Home.css";
import { useMsal } from "@azure/msal-react";
import { useIsAuthenticated } from "@azure/msal-react";

export default function Home() {
  const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();

  const handleLogin = () => {
    instance.loginRedirect();
  };

  return (
    <div className="home-container">
        <h1>Welcome to Financial Flow</h1>
        <h3>Your personal finance management tool</h3>
        {isAuthenticated ? <p>You are logged in</p> : <div><p>Login to access the app</p><button onClick={handleLogin}>Login</button></div>}
    </div>
  )
}