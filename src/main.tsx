import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './pages/Home'
import About from './pages/About'
import FilePortal from './pages/FilePortal'
import FileTransactions from './pages/FileTransactions'
import FileAudit from './pages/FileAudit'
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route
              path="file-portal"
              element={
                  <FilePortal />
              }
            />
            <Route
              path="file-transactions"
              element={
                  <FileTransactions />
              }
            />
            <Route
              path="file-audit"
              element={
                  <FileAudit />
              }
            />
          </Route>
        </Routes>
    </BrowserRouter>
  </StrictMode>,
);
