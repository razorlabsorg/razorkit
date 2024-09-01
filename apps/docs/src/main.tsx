import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import '@razorlabs/razorkit/styles.css'
import Providers from 'Providers'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <Providers>
          <App />
        </Providers>
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>,
)
