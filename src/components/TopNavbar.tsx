import "./TopNavbar.css"
import { Link } from "react-router-dom"

export default function TopNavbar() {
  return (
    <>
      <nav className="topnavbar">
        <div className="topnavbar-logo">Financial Flow</div>
        <ul className="topnavbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
          <li>
          <Link to="/about">About</Link>
        </li>
        </ul>
      </nav>
    </>
  )
}