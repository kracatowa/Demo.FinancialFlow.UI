import './App.css'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import TopNavbar from './components/TopNavbar'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <TopNavbar />
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default App
