import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import FormQRCode from './FormQRCode'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FormQRCode />
  </StrictMode>,
)
