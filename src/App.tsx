import './App.css'
import Footer from './components/Footer'
import TopNavbar from './components/TopNavbar'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <TopNavbar />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default App
