import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './pages/Home'
import About from './pages/About'
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./components/login/AuthConfig";
import FilePortal from './pages/FilePortal'
import RequireAuth from './components/login/RequiredAuth'
import FileTransactions from './pages/FileTransactions'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MsalProvider instance={msalInstance}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route
              path="file-portal"
              element={
                <RequireAuth>
                  <FilePortal />
                </RequireAuth>
              }
              
            />
          <Route
              path="file-transactions"
              element={
                <RequireAuth>
                  <FileTransactions />
                </RequireAuth>
              }
              
            />
          </Route>

        </Routes>
      </MsalProvider>
    </BrowserRouter>
  </StrictMode>,
)
