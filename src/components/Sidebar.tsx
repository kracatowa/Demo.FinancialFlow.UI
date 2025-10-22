import { Link } from "react-router-dom"
import "./Sidebar.css"

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Navigation</h3>
      <ul>
        <li>
          <Link to="/file-portal">
            <button className="sidebar-btn">File Portal</button>
          </Link>
          <Link to="/file-transactions">
            <button className="sidebar-btn">File Transactions</button>
          </Link>
        </li>
      </ul>
    </div>
  )
}
