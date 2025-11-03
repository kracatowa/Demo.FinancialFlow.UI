import "./Login.css";

export default function Login() {
  return (
    <div className="login-container">
      <h1 className="login-primary-text">We are logging you in</h1>
      <div className="login-message-container">
        <p className="login-secondary-text">It should be ready in just a moment</p>
        <p className="login-third-text">...</p>
      </div>
    </div>
  );
}