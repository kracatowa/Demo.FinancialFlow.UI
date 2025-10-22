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
      <div className="app-layout">
        {isAuthenticated && <Sidebar />}
        <div className="main-content">
          <Outlet />
          <Footer />
        </div>

      </div>

    </>
  )
}

export default App
