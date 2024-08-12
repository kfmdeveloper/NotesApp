import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import Store from './redux/store.jsx'
import { ToastContainer } from 'react-toastify'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <ToastContainer />
      <App />
    </Provider>
  </StrictMode>,
)
