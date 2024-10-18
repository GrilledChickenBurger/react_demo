import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// import App from './App.jsx'
import App from './App_nav.jsx'

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <FrontPage /> */}
    {/* <BranchPage3 /> */}
  </StrictMode>,
)
