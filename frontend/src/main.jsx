import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
    style: {
      background: "#111827",
      color: "#fff",
      borderRadius: "8px",
      padding: "12px 16px",
      fontSize: "14px",
    },
    success: {
      iconTheme: {
        primary: "#22c55e",
        secondary: "#fff",
      },
    },
    error: {
      iconTheme: {
        primary: "#ef4444",
        secondary: "#fff",
      },
    },
  }}
/>

  </StrictMode>,
)
