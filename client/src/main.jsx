import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

const AppWithProviders = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      {googleClientId ? (
        <GoogleOAuthProvider clientId={googleClientId}>
          <AppWithProviders />
        </GoogleOAuthProvider>
      ) : (
        <AppWithProviders />
      )}
    </ThemeProvider>
  </StrictMode>,
)
