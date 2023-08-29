import { BrowserRouter } from 'react-router-dom'
import RoutesApp from './routes'

import AuthProvider from './contexts/auth'
import StoreProvider from './contexts/store'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './css/app.css'
import './css/custom-buttons.css'
import './css/bootstrap-utilities.css'
import './css/pico-bootstrap-grid.css'

function App() {
  return (
    <BrowserRouter>
      <div>
        <ToastContainer autoClose={1000} pauseOnHover={true} />
      </div>
      <AuthProvider>
        <StoreProvider>
          <RoutesApp />
        </StoreProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
