import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './lib/gsap'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
