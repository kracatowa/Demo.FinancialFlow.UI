import './App.css'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import TopNavbar from './components/TopNavbar'
import { Outlet } from 'react-router-dom'
import { useIsAuthenticated } from "@azure/msal-react";

function App() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      <TopNavbar />
      {isAuthenticated && <Sidebar />}
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default App
