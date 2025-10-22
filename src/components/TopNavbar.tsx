import "./TopNavbar.css"
import { Link } from "react-router-dom"
import { FaHome } from "react-icons/fa"

export default function TopNavbar() {
  return (
    <nav className="topnavbar">
      <Link to="/" className="topnavbar-logo-link">
        <span className="home-icon" aria-label="Home" title="Home">
          <FaHome className="home-icon-svg" />
        </span>
        <span className="topnavbar-logo">Financial Flow</span>
      </Link>
      <ul className="topnavbar-links">
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>

  )
}