import "./TopNavbar.css"
import { Link } from "react-router-dom"
import { FaHome } from "react-icons/fa"

export default function TopNavbar() {
  return (
    <nav className="topnavbar">
      <div className="topnavbar-left">
        <Link to="/" className="topnavbar-logo-link">
          <span className="home-icon" aria-label="Home" title="Home">
            <FaHome className="home-icon-svg" />
          </span>
          <span className="topnavbar-logo topnavbar-financialflow">Financial Flow</span>
        </Link>
      </div>
      <div className="topnavbar-right">
        <Link to="/about">
          <span className="topnavbar-logo topnavbar-about">About</span>
        </Link>
      </div>
    </nav>

  )
}