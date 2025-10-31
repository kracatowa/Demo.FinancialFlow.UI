import './App.css'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Sidebar />
      <div className="app-layout">
        <div className="main-content">
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
