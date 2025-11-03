import "./Home.css";
import { useAuth } from "../components/login/AuthContext";

export default function Home() {
  const auth = useAuth();
  
  const handleLogin = () => {
    auth.login();
  };

  return (
    <div className="app-container home-container">
        <h1>Welcome to Oflow</h1>
        <h3>Your enterprise finance management tool</h3>
        {auth.isAuthenticated() ? <p>You are logged in</p> : <div><p>Login to access the app</p><button onClick={handleLogin}>Login</button></div>}
    </div>
  )
}