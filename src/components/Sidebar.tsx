import { Link } from "react-router-dom"
import { FaHome } from "react-icons/fa"
import "./Sidebar.css"

export default function Sidebar() {
  return (
    <aside className="sidebar-container">
      <nav className="sidebar-nav-container">
        <header className="sidebar-header-container">
            <figure>
              <img src="/wave-png-49467.png" className="sidebar-logo" />
              <figcaption>Oflow</figcaption>
            </figure>
        </header>
        <section className="sidebar-section-container">
          <ul>
          <li className="sidebar-li sidebar-li-header">Général</li>
          <li className="sidebar-li">
            <Link to="/" className="sidebar-li-a">
              <span className="sidebar-icon">
                <FaHome />
              </span>
              <span className="sidebar-text">Home</span>
            </Link>
          </li>
        </ul>
        </section>
        
      </nav>
    </aside>
  )
}