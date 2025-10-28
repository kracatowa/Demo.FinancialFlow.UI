import { Link } from "react-router-dom"
import "./Sidebar.css"
import { useState } from "react"

export default function Sidebar() {
  const [fileOpen, setFileOpen] = useState(true)

  return (
    <div className="sidebar">
      <h3>Navigation</h3>
      <ul>
        <li>
          <button
            className="sidebar-btn"
            onClick={() => setFileOpen((open) => !open)}
          >
            File
          </button>
          <ul
            className={`sidebar-submenu${fileOpen ? " open" : ""}`}
            style={{ pointerEvents: fileOpen ? "auto" : "none" }}
          >
            <li>
              <Link to="/file-portal">
                <button className="sidebar-btn">Portal</button>
              </Link>
            </li>
            <li>
              <Link to="/file-transactions">
                <button className="sidebar-btn">Transactions</button>
              </Link>
            </li>
            <li>
              <Link to="/file-audit">
                <button className="sidebar-btn">Audit</button>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )
}
