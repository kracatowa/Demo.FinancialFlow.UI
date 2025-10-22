import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <div className="footer">
      <p>&copy; 2025 Financial Flow. All rights reserved.</p>
      <p>Privacy Policy | Terms of Service</p>
      <Link to="/about">Contact Us</Link>
    </div>
  )
}
